package org.project.appServer.model.member.dao;

import java.util.HashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.project.appServer.model.member.dto.MemberDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class MemberDAOImpl implements MemberDAO {

	private static final Logger logger = LoggerFactory.getLogger(MemberDAOImpl.class);
	
	@Inject
	SqlSession sqlSession;
			
	@Override
	public int insertMember(MemberDTO vo) {
		logger.info("insert Member...");
		sqlSession.insert("member.insertMember",vo);
		return vo.getUser_id();
	}

	@Override
	public boolean deleteMember(int user_id) {
		logger.info("delete member...");
		if(sqlSession.delete("member.deleteMember",user_id)!=0)
			return true;
		return false;
	}

	@Override
	public void logout(HttpSession session) {
		logger.info("logout...");
		session.invalidate();
	}

	@Override
	public MemberDTO checkPw(MemberDTO dto) {
		logger.info("ckeck password...");
		return sqlSession.selectOne("member.checkLogin",dto);
	}
	
	@Override
	public boolean checkEmail(String email_address) {
		logger.info("checkEmail called...");
		boolean result = false;
		Map<String,String> map= new HashMap<String,String>();
		map.put("email_address",email_address);
		int count = sqlSession.selectOne("member.checkEmail", map);
		logger.info(count+"");
		if(count==0) result = true;
		return result;
	}
	
	@Override
	public void setKey(MemberDTO vo) {
		logger.info("setting key...");
		sqlSession.update("member.updateKey",vo);
	}
	
	@Override
	public void keyAlter(int user_id, String key) {
		logger.info("key alter to Y now...");
		Map<String,Object> map= new HashMap<String,Object>();
		map.put("user_id",user_id);
		map.put("key", key);
		sqlSession.update("member.alterKey",map);
	}
	
	@Override
	public void profileAlter(int user_id,String user_profile_pic_url,String user_desc) {
		logger.info("profile setting...");
		Map<String,Object> map= new HashMap<String,Object>();
		map.put("user_id",user_id);
		map.put("user_profile_pic_url", user_profile_pic_url);		
		map.put("user_desc", user_desc);
		sqlSession.update("member.alterProfile",map);
	}

	@Override
	public void setPw(MemberDTO vo) {
		logger.info("setting new password...");
		sqlSession.update("member.updatePw",vo);
	}
}
