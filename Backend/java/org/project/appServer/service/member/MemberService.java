package org.project.appServer.service.member;

import javax.servlet.http.HttpSession;

import org.project.appServer.model.member.dto.MemberDTO;

public interface MemberService {
	public int insertMember(MemberDTO dto);
	public boolean deleteMember(int user_id);
	public void logout(HttpSession session);
	public MemberDTO checkPw(MemberDTO dto);
	public boolean checkEmail(String email_address);
	public void keyAlter(int user_id,String key);
	public void profileAlter(int user_id,String user_profile_pic_url,String user_desc);
}
