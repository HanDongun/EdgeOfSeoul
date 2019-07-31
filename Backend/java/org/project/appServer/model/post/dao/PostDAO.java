package org.project.appServer.model.post.dao;

import java.util.List;

import org.project.appServer.model.photo.dto.PhotoDTO;
import org.project.appServer.model.post.dto.PostDTO;

public interface PostDAO {
	public List<PostDTO> postList(int user_id);
	public int uploadPost(PostDTO dto);
	public boolean deletePost(PostDTO dto);
	public List<PhotoDTO> postDetail(int user_id, int post_id);
}
