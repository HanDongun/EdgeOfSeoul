package org.project.appServer.model.tourPlace.dao;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.project.appServer.model.tourPlace.dto.TourDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class TourDAOImpl implements TourDAO {
	private static final Logger logger = LoggerFactory.getLogger(TourDAOImpl.class);
	
	@Inject
	SqlSession sqlSession;
	
	@Override
	public List<TourDTO> findPlace(String keyword) {
		logger.info("find place...");
		List<TourDTO> list = new ArrayList<TourDTO>();
		list =  sqlSession.selectList("tour.viewTour", keyword);
		return list;
	}
}
