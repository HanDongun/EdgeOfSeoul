package org.project.appServer.model.photo.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.project.appServer.model.photo.dto.PhotoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class PhotoDAOImpl implements PhotoDAO {

	private static final Logger logger = LoggerFactory.getLogger(PhotoDAOImpl.class);
	
	@Inject
	SqlSession sqlSession;

	@Override
	public void insertPhoto(List<PhotoDTO> dtoList) {
		logger.info("insert photo...");
		PhotoDTO dto = dtoList.get(0);
		int photoId = sqlSession.selectOne("photo.selectPhotoId",dto);
		photoId++;
		String createSeq = "create sequence seq_photo_id start with " +photoId + " increment by 1";
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("createSeq", createSeq);
		sqlSession.insert("photo.dropSeq");
		sqlSession.insert("photo.createSeq", map);
		for(int i = 0; i < dtoList.size(); i++) {
			sqlSession.insert("photo.insertPhoto",dtoList.get(i));
		}
	}
}