package org.project.appServer.model.photo.dto;


public class PhotoDTO {
	private int user_id;
	private int post_id;
	private int photo_id;
	private String photo_description;
	private String photo_url;
	private String photo_latitude;
	private String photo_longitude;

	public PhotoDTO() {}
	public PhotoDTO(int user_id, int post_id,int photo_id, String photo_description, String photo_url,
			String photo_latitude, String photo_longitude) {
		super();
		this.user_id = user_id;
		this.post_id = post_id;
		this.photo_id = photo_id;
		this.photo_description = photo_description;
		this.photo_url = photo_url;
		this.photo_latitude = photo_latitude;
		this.photo_longitude = photo_longitude;
	}


	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getPost_id() {
		return post_id;
	}
	public void setPost_id(int post_id) {
		this.post_id = post_id;
	}
	public int getPhoto_id() {
		return photo_id;
	}
	public void setPhoto_id(int photo_id) {
		this.photo_id = photo_id;
	}
	public String getPhoto_description() {
		return photo_description;
	}
	public void setPhoto_description(String photo_description) {
		this.photo_description = photo_description;
	}
	public String getPhoto_url() {
		return photo_url;
	}
	public void setPhoto_url(String photo_url) {
		this.photo_url = photo_url;
	}
	public String getPhoto_latitude() {
		return photo_latitude;
	}
	public void setPhoto_latitude(String photo_latitude) {
		this.photo_latitude = photo_latitude;
	}
	public String getPhoto_longitude() {
		return photo_longitude;
	}
	public void setPhoto_longitude(String photo_longitude) {
		this.photo_longitude = photo_longitude;
	}
	@Override
	public String toString() {
		return "PhotoDTO [user_id=" + user_id + ", post_id=" + post_id + ", photo_id=" + photo_id
				+ ", photo_description=" + photo_description + ", photo_url=" + photo_url + ", photo_latitude="
				+ photo_latitude + ", photo_longitude=" + photo_longitude + "]";
	}
	
	
}
