package org.project.appServer.model.post.dto;

import oracle.sql.DATE;

public class PostDTO {
	private int user_id;
	private int post_id;
	private String post_title;
	private String title_photo_url;
	private DATE post_date;

	public String getPost_title() {
		return post_title;
	}
	public void setPost_title(String post_title) {
		this.post_title = post_title;
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
	public String getTitle_photo_url() {
		return title_photo_url;
	}
	public void setTitle_photo_url(String title_photo_url) {
		this.title_photo_url = title_photo_url;
	}
	public DATE getPost_date() {
		return post_date;
	}
	public void setPost_date(DATE post_date) {
		this.post_date = post_date;
	}
	@Override
	public String toString() {
		return "PostDTO [user_id=" + user_id + ", post_id=" + post_id + "post_title :" + post_title +", title_photo_url=" + title_photo_url + ", post_date=" + post_date + "]";
	}
}
