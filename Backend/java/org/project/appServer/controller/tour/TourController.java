package org.project.appServer.controller.tour;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.project.appServer.model.tourPlace.dto.TourDTO;
import org.project.appServer.service.tour.TourService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TourController {
	
	private static final Logger logger = LoggerFactory.getLogger(TourController.class);
	
	@Inject
	TourService tourService;
	
	@RequestMapping(value="/findPlace", method=RequestMethod.POST)
	public @ResponseBody List<TourDTO> findPlace(@RequestBody Map<String,String> map){
		logger.info("find place..");
		String keyword = map.get("search_keyword");
		return tourService.findPlace(keyword);
	}
}
