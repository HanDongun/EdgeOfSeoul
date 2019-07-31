package org.project.appServer.service.email;

import java.util.Random;

import javax.inject.Inject;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;

import org.project.appServer.model.email.dto.EmailDTO;
import org.project.appServer.model.member.dao.MemberDAO;
import org.project.appServer.model.member.dto.MemberDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
	private boolean lowerCheck;
	private int size;
	private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);
	
	@Inject
	JavaMailSender mailSender;
	
	@Inject
	MemberDAO memberDao;
	@Override
	public void sendMail(EmailDTO emailDto, MemberDTO memberDto) {
		logger.info("send mail now...");
		String key = getKey(false, 20);
		memberDto.setKey(key);
		String message =  "<h2>Hi "+memberDto.getUser_name()+"</h2><br><br>" 
				+ "<p>You can login if you click this link : " 
				+ "<a href='http://@localhost/appServer/member/key_alter?user_id="+ memberDto.getUser_id()+"&user_key="+key+"'>click here</a></p>"
				+ "(If it is not your account, do not click the link)";
		emailDto.setMessage(message);
		emailDto.setReceiveMail(memberDto.getEmail_address());
		memberDao.setKey(memberDto);
		try {
			MimeMessage msg = mailSender.createMimeMessage();
			msg.addRecipient(RecipientType.TO, new InternetAddress(emailDto.getReceiveMail()));
			msg.addFrom(new InternetAddress[] {
					new InternetAddress(emailDto.getSenderMail(),emailDto.getSenderName())
			});
			msg.setSubject(emailDto.getSubject(),"utf-8");
			msg.setText(emailDto.getMessage(),"utf-8","html");
			mailSender.send(msg);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void sendMail_2(EmailDTO emailDto, MemberDTO memberDto) {
		logger.info("send mail now...");
		String key = getKey(false, 20);
		memberDto.setUser_pwd(key);
		String message =  "<h2>Hi "+memberDto.getUser_name()+"</h2><br><br>" 
				+ "<p>Your password is : " + key
				+ "(Please change your password after login)";
		emailDto.setMessage(message);
		emailDto.setReceiveMail(memberDto.getEmail_address());
		memberDao.setPw(memberDto);
		try {
			MimeMessage msg = mailSender.createMimeMessage();
			msg.addRecipient(RecipientType.TO, new InternetAddress(emailDto.getReceiveMail()));
			msg.addFrom(new InternetAddress[] {
					new InternetAddress(emailDto.getSenderMail(),emailDto.getSenderName())
			});
			msg.setSubject(emailDto.getSubject(),"utf-8");
			msg.setText(emailDto.getMessage(),"utf-8","html");
			mailSender.send(msg);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private String init() {
		Random ran = new Random();
		StringBuffer sb = new StringBuffer();
		int num = 0;
		do {
			num = ran.nextInt(75) + 48;
			if ((num >= 48 && num <= 57) || (num >= 65 && num <= 90) || (num >= 97 && num <= 122)) {
				sb.append((char) num);
			} else {
				continue;
			}

		} while (sb.length() < size);
		if (lowerCheck) {
			return sb.toString().toLowerCase();
		}
		return sb.toString();
	}

	public String getKey(boolean lowerCheck, int size) {
		this.lowerCheck = lowerCheck;
		this.size = size;
		return init();
	}
}
