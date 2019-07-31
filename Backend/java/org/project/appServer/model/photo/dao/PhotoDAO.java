package org.project.appServer.model.photo.dao;

import java.util.List;

import org.project.appServer.model.photo.dto.PhotoDTO;

public interface PhotoDAO {
	public void insertPhoto(List<PhotoDTO> dtoList);
}
