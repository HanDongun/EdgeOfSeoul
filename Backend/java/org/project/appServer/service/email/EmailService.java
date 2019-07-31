package org.project.appServer.service.email;

import org.project.appServer.model.email.dto.EmailDTO;
import org.project.appServer.model.member.dto.MemberDTO;

public interface EmailService {
	public void sendMail(EmailDTO EmailDto, MemberDTO memberDto);
	public void sendMail_2(EmailDTO EmailDto, MemberDTO memberDto);
}
