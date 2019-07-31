package org.project.appServer.service.photo;

import java.util.List;

import org.project.appServer.model.photo.dto.PhotoDTO;

public interface PhotoService {
	public void insertPhoto(List<PhotoDTO> dtoList);
}
