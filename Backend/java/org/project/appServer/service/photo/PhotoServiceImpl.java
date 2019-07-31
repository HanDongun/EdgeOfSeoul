package org.project.appServer.service.photo;

import java.util.List;

import javax.inject.Inject;

import org.project.appServer.model.photo.dao.PhotoDAO;
import org.project.appServer.model.photo.dto.PhotoDTO;
import org.springframework.stereotype.Service;

@Service
public class PhotoServiceImpl implements PhotoService {

	@Inject
	PhotoDAO photoDao;
	@Override
	public void insertPhoto(List<PhotoDTO> dtoList) {
		photoDao.insertPhoto(dtoList);
	}

}
