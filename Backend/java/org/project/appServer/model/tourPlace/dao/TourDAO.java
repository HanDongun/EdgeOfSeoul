package org.project.appServer.model.tourPlace.dao;

import java.util.List;

import org.project.appServer.model.tourPlace.dto.TourDTO;

public interface TourDAO {
	public List<TourDTO> findPlace(String place_name);
}
