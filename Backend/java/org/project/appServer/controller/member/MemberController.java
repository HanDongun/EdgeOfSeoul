package org.project.appServer.controller.member;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.project.appServer.model.email.dto.EmailDTO;
import org.project.appServer.model.member.dto.MemberDTO;
import org.project.appServer.service.email.EmailService;
import org.project.appServer.service.member.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
public class MemberController {

	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@Inject
	MemberService memberService;

	@Resource(name="uploadPath")
	String uploadPath;

	@RequestMapping(value="/member/signIn", method = RequestMethod.POST)
	public @ResponseBody Map<String,Integer> signIn(@RequestBody MemberDTO memberDto) {
		logger.info("signIn..");
		memberDto.setUser_id(memberService.insertMember(memberDto));
		Map<String,Integer> map = new HashMap<String,Integer>();
		if(!sendMail(memberDto)) {
			map.put("checker", 0);
			return map;
		}
		map.put("checker", 1);
		map.put("user_id", memberDto.getUser_id());
		return map;
	}

	@RequestMapping(value="/member/checkEmail", method =  RequestMethod.POST)
	public @ResponseBody Map<String,Object> checkEamil(@RequestBody Map<Object,Object> emailMap){
		logger.info("checkEmail..");
		String email_address = (String)emailMap.get("email_address");
		boolean check = memberService.checkEmail(email_address);
		Map <String,Object> map = new HashMap<String,Object>();
		if(!check) {
			map.put("checker", 0);
			return map;
		}
		map.put("checker", 1);
		return map;
	}

	@Inject
	EmailService emailService;
	private boolean sendMail(MemberDTO memberDto) {
		EmailDTO emailDto = new EmailDTO();
		try {
			emailService.sendMail(emailDto, memberDto);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@RequestMapping(value="/member/login", method = RequestMethod.POST)
	public @ResponseBody Map<String,Object> login(@RequestBody MemberDTO dto,HttpSession session) {
		logger.info("login..");
		MemberDTO vo = memberService.checkPw(dto);
		Map <String,Object> map = new HashMap<String,Object>();

		if ( vo != null && vo.getKey().equals("Y")){
			session.setAttribute("user_id", vo.getUser_id());
			map.put("checker", vo.getUser_id());
			map.put("user_name", vo.getUser_name());
			if(vo.getUser_desc()!=null)
				map.put("user_desc", vo.getUser_desc());
			if(vo.getUser_profile_pic_url()!=null)
				map.put("user_profile_pic_url",vo.getUser_profile_pic_url());
		}else if(vo == null){
			map.put("checker", 0);
		}
		else map.put("checker", -1);
		return map;
	}

	@RequestMapping(value="/member/key_alter", method = RequestMethod.GET)
	public String keyAlter(@RequestParam("user_id") int user_id, @RequestParam("user_key") String key) {
		logger.info("key alter..");
		memberService.keyAlter(user_id, key);
		return "success";
	}

	@RequestMapping(value="/member/profile_alter/{user_id}", method = RequestMethod.POST)
	public @ResponseBody Map<String,Object> profileAlter(@PathVariable("user_id") int user_id,MultipartFile file, @RequestParam("user_desc") String user_desc) throws Exception {
		logger.info("profile alter..");
		logger.info(user_desc);
		Map <String,Object> map = new HashMap<String,Object>();
		String savedName =  file.getOriginalFilename();
		savedName = uploadFile(user_id,savedName,file.getBytes());
		String user_profile_pic_url = "/appServer/getPic/"+user_id+"/"+savedName;
		memberService.profileAlter(user_id,user_profile_pic_url,user_desc);
		map.put("checker", 1);
		return map;
	}

	@RequestMapping(value="/member/delete/{user_id}")
	public Map<String,Integer> delete(@PathVariable("user_id") int user_id,@RequestParam(value="user_pwd")String user_pwd){
		logger.info("delete..");
		Map <String,Integer> map = new HashMap<String,Integer>();
		if(!memberService.deleteMember(user_id)) {
			map.put("checker", 0);
		}
		map.put("checker", 1);
		return map;
	}

	@RequestMapping(value="/member/logout/{user_id}")
	public Map<String,String> logout(HttpSession session) {
		logger.info("logout..");
		Map <String,String> map = new HashMap<String,String>();
		memberService.logout(session);
		map.put("checker", "logout");
		return map;
	}

	private String uploadFile(int user_id, String originalName, byte[] fileData) throws Exception{
		UUID uid = UUID.randomUUID();
		String savedName = uid.toString() + "_" + originalName;
		File directory = new File(uploadPath+"/"+user_id);
		directory.mkdirs();
		File target = new File(uploadPath+"/"+user_id, savedName);
		FileCopyUtils.copy(fileData, target);
		return savedName;
	}
	
	@RequestMapping(value="/member/findPw")
	public @ResponseBody Map<String,Integer> findPw(@RequestBody MemberDTO memberDto){
		logger.info("find pw..");
		Map <String,Integer> map = new HashMap<String,Integer>();
		if(!sendMail_2(memberDto)) {
			map.put("checker", 0);
		}
		map.put("checker", 1);
		return map;
	}
	
	private boolean sendMail_2(MemberDTO memberDto) {
		EmailDTO emailDto = new EmailDTO();
		try {
			emailService.sendMail_2(emailDto, memberDto);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
