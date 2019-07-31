package org.project.appServer.controller.post;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.project.appServer.model.photo.dto.PhotoDTO;
import org.project.appServer.model.post.dto.PostDTO;
import org.project.appServer.service.photo.PhotoService;
import org.project.appServer.service.post.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.drew.imaging.ImageMetadataReader;
import com.drew.lang.GeoLocation;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.GpsDirectory;

@Controller
public class PostController {
	
	private static final Logger logger = LoggerFactory.getLogger(PostController.class);
	
	@Inject
	PostService postService;

	@Resource(name="uploadPath")
	String uploadPath;

	@RequestMapping(value="/appMain/{user_id}", method=RequestMethod.POST)
	public @ResponseBody List<PostDTO> viewPost(@PathVariable("user_id") int user_id){
		logger.info("main..");
		return postService.postList(user_id);
	}

	@Inject PhotoService photoService;
	@RequestMapping(value="/postUpload/{user_id}", method=RequestMethod.POST)
	public @ResponseBody Map<String,Integer> postUpload(@PathVariable("user_id") int user_id, MultipartHttpServletRequest mhsr,@RequestParam(value = "photo_title", required = false)String post_title,@RequestParam(value="desc",required = false)List<String> descList) throws Exception{
		logger.info("upload post..");
		List<MultipartFile> files = mhsr.getFiles("file");
		Map<String,Integer> fileInfo = new HashMap<String,Integer>();
		List<PhotoDTO> photoList = new ArrayList<PhotoDTO>();
		String savedName = null;
		Map<String,Object> map;
		Map<String,Object> metaMap;
		PostDTO PostDto = new PostDTO();
		PostDto.setUser_id(user_id);
		int post_id = 0;
		String photo_description = null;
		for(int i = 0; i < files.size(); i++) {
			map = new HashMap<String,Object>();
			metaMap = new HashMap<String,Object>();
			savedName =  files.get(i).getOriginalFilename();
			savedName = uploadFile(user_id,savedName,files.get(i).getBytes());
			metaMap = getMetaData(convert(files.get(i)));
			String photo_url = "/appServer/getPic/"+user_id+"/"+savedName;
			map.put("url",photo_url);
			map.put("photo_latitude",metaMap.get("photo_latitude"));
			map.put("photo_longitude",metaMap.get("photo_logitude"));
			map.put("photo_id", i+1);
			if(i == 0) {
				PostDto.setTitle_photo_url(photo_url);
				PostDto.setPost_title(post_title);
				post_id = postService.uploadPost(PostDto);
				PostDto.setPost_id(post_id);
			}
			if(descList.size()!=0) {
				if(descList.get(i)!=null) {
					photo_description = descList.get(i);
				}
				else 
					photo_description = null;
			}
		
			PhotoDTO photoDto = new PhotoDTO(user_id,post_id,i+1,photo_description,photo_url,String.valueOf(metaMap.get("photo_latitude")),String.valueOf(metaMap.get("photo_longitude")));
			photoList.add(photoDto);
		}
		photoService.insertPhoto(photoList);
		fileInfo.put("checker", 1);
		return fileInfo;
	}

	private Map<String,Object> getMetaData(File in) {
		Metadata metadata;
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			metadata = ImageMetadataReader.readMetadata(in);
			GpsDirectory gpsDirectory = metadata.getFirstDirectoryOfType(GpsDirectory.class);
			GeoLocation geoLocation = gpsDirectory.getGeoLocation();

			if(geoLocation != null && !geoLocation.isZero()) {
				map.put("photo_latitude",geoLocation.getLatitude());
				map.put("photo_longitude",geoLocation.getLongitude());
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return map;
	}

	private File convert(MultipartFile multipartFile) throws Exception {  
		File file= new File(multipartFile.getOriginalFilename());
		file.createNewFile();
		FileOutputStream fos = new FileOutputStream(file);
		fos.write(multipartFile.getBytes());
		fos.close();
		return file;
	}


	private String uploadFile(int user_id,String originalName, byte[] fileData) throws Exception{
		UUID uid = UUID.randomUUID();
		String savedName = uid.toString() + "_" + originalName;
		File directory = new File(uploadPath+"/"+user_id);
		directory.mkdirs();
		File target = new File(uploadPath+"/"+user_id, savedName);
		FileCopyUtils.copy(fileData, target);
		return savedName;
	}


	@RequestMapping(value="/viewPost/{user_id}/{post_id}", method=RequestMethod.POST)
	public @ResponseBody List<PhotoDTO> viewPost(@PathVariable int user_id, @PathVariable int post_id){
		logger.info("main..");
		return postService.postDetail(user_id, post_id);
	}

	@RequestMapping(value="/getPic")
	public void getPic(){
	}
}
