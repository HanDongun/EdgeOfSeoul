package org.project.appServer.model.tourPlace.dto;

public class TourDTO {
	private int numb;
	private String place_latitude;
	private String place_longitude;
	private String place_name;
	private String place_address;
	private String place_pic_url_1;
	private String place_pic_url_2;
	public int getNumb() {
		return numb;
	}
	public void setNumb(int numb) {
		this.numb = numb;
	}
	public String getPlace_latitude() {
		return place_latitude;
	}
	public void setPlace_latitude(String place_latitude) {
		this.place_latitude = place_latitude;
	}
	public String getPlace_longitude() {
		return place_longitude;
	}
	public void setPlace_longitude(String place_longitude) {
		this.place_longitude = place_longitude;
	}
	public String getPlace_name() {
		return place_name;
	}
	public void setPlace_name(String place_name) {
		this.place_name = place_name;
	}
	public String getPlace_address() {
		return place_address;
	}
	public void setPlace_address(String place_address) {
		this.place_address = place_address;
	}
	public String getPlace_pic_url_1() {
		return place_pic_url_1;
	}
	public void setPlace_pic_url_1(String place_pic_url_1) {
		this.place_pic_url_1 = place_pic_url_1;
	}
	public String getPlace_pic_url_2() {
		return place_pic_url_2;
	}
	public void setPlace_pic_url_2(String place_pic_url_2) {
		this.place_pic_url_2 = place_pic_url_2;
	}
	@Override
	public String toString() {
		return "TourDTO [numb=" + numb + ", place_latitude=" + place_latitude + ", place_longitude=" + place_longitude
				+ ", place_name=" + place_name + ", place_address=" + place_address + ", place_pic_url_1="
				+ place_pic_url_1 + ", place_pic_url_2=" + place_pic_url_2 + "]";
	}
	
	
}
