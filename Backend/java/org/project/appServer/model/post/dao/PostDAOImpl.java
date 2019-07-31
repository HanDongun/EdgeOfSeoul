package org.project.appServer.model.post.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.project.appServer.model.photo.dto.PhotoDTO;
import org.project.appServer.model.post.dto.PostDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class PostDAOImpl implements PostDAO {
	@Inject
	SqlSession sqlSession;
	
	private static final Logger logger = LoggerFactory.getLogger(PostDAOImpl.class);
	
	
	
	@Override
	public List<PostDTO> postList(int user_id) {
		logger.info("get posts...");
		return sqlSession.selectList("post.viewPost", user_id);
	}

	@Override
	public int uploadPost(PostDTO dto) {
		logger.info("insert post...");
		int postId = sqlSession.selectOne("post.selectPostId",dto);
		postId++;
		dto.setPost_id(postId);
		sqlSession.insert("post.insertPost", dto);
		return postId;
	}

	@Override
	public boolean deletePost(PostDTO dto) {
		logger.info("delete post...");
		if(sqlSession.delete("post.deletePost", dto)!=0) {
			return true;
		}
		return false;
	}
	
	@Override
	public List<PhotoDTO> postDetail(int user_id, int post_id){
		logger.info("into post...");
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("user_id", user_id);
		map.put("post_id", post_id);
		return sqlSession.selectList("post.viewPostDetail",map);
	}

}
