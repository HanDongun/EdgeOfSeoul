package org.project.appServer.service.tour;

import java.util.List;

import org.project.appServer.model.tourPlace.dto.TourDTO;

public interface TourService {
	public List<TourDTO> findPlace(String place_name);
}
