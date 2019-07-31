package org.project.appServer.model.member.dto;

import java.util.Date;

public class MemberDTO {
	private int user_id;
	private String user_pwd;
	private String user_name;
	private String email_address;
	private String user_profile_pic_url;
	private String user_desc;
	private String key;
	private Date join_date;
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getUser_pwd() {
		return user_pwd;
	}
	public void setUser_pwd(String user_pwd) {
		this.user_pwd = user_pwd;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getEmail_address() {
		return email_address;
	}
	public void setEmail_address(String email_address) {
		this.email_address = email_address;
	}
	public String getUser_profile_pic_url() {
		return user_profile_pic_url;
	}
	public void setUser_profile_pic_url(String user_profile_pic_url) {
		this.user_profile_pic_url = user_profile_pic_url;
	}
	public String getUser_desc() {
		return user_desc;
	}
	public void setUser_desc(String user_desc) {
		this.user_desc = user_desc;
	}
	public Date getJoin_date() {
		return join_date;
	}
	public void setJoin_date(Date join_date) {
		this.join_date = join_date;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	@Override
	public String toString() {
		return "MemberDTO [user_id=" + user_id + ", user_pwd=" + user_pwd + ", user_name=" + user_name
				+ ", email_address=" + email_address + ", user_profile_pic_url=" + user_profile_pic_url + ", user_desc="
				+ user_desc + ", key=" + key + ", join_date=" + join_date + "]";
	}
}
