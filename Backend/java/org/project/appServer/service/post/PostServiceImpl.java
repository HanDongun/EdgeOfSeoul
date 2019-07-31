package org.project.appServer.service.post;

import java.util.List;

import javax.inject.Inject;

import org.project.appServer.model.photo.dto.PhotoDTO;
import org.project.appServer.model.post.dao.PostDAO;
import org.project.appServer.model.post.dto.PostDTO;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {
	
	@Inject
	PostDAO postDao;
	
	@Override
	public List<PostDTO> postList(int user_id) {
		return postDao.postList(user_id);
	}

	@Override
	public int uploadPost(PostDTO dto) {
		return postDao.uploadPost(dto);
	}

	@Override
	public boolean deletePost(PostDTO dto) {
		return postDao.deletePost(dto);
	}
	
	@Override
	public List<PhotoDTO> postDetail(int user_id, int post_id){
		return postDao.postDetail(user_id,post_id);
	}

}
