package org.project.appServer.service.member;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.project.appServer.model.member.dao.MemberDAO;
import org.project.appServer.model.member.dto.MemberDTO;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService {

	@Inject
	MemberDAO memberDao;

	@Override
	public int insertMember(MemberDTO dto) {
		return memberDao.insertMember(dto);
	}

	@Override
	public boolean deleteMember(int user_id) {
		return memberDao.deleteMember(user_id);
	}

	@Override
	public void logout(HttpSession session) {
		memberDao.logout(session);
	}

	@Override
	public MemberDTO checkPw(MemberDTO dto) {
		return memberDao.checkPw(dto);
	}
	
	@Override
	public boolean checkEmail(String email_address) {
		return memberDao.checkEmail(email_address);
	} 
	
	@Override
	public void keyAlter(int user_id,String key) {
		memberDao.keyAlter(user_id, key);
	}
	
	@Override
	public void profileAlter(int user_id,String user_profile_pic_url,String user_desc) {
		memberDao.profileAlter(user_id,user_profile_pic_url,user_desc);
	}
}
