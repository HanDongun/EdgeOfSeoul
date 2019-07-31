package org.project.appServer.service.tour;

import java.util.List;

import javax.inject.Inject;

import org.project.appServer.model.tourPlace.dao.TourDAO;
import org.project.appServer.model.tourPlace.dto.TourDTO;
import org.springframework.stereotype.Service;

@Service
public class TourServiceImpl implements TourService {
	
	@Inject
	TourDAO tourDao;
	
	@Override
	public List<TourDTO> findPlace(String keyword) {
		return tourDao.findPlace(keyword);
	}

}
