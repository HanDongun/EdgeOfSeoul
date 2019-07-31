package org.project.appServer.model.email.dto;

public class EmailDTO {
	private final String senderName = "HERE";
	private final String senderMail = "Server Mail";
	private String receiveMail;
	private final String subject = "Mail from HERE";
	private String message;
	public String getSenderName() {
		return senderName;
	}
	
	public String getSenderMail() {
		return senderMail;
	}

	public void setReceiveMail(String receiveMail) {
		this.receiveMail = receiveMail;
	}

	public String getReceiveMail() {
		return receiveMail;
	}

	public String getSubject() {
		return subject;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	@Override
	public String toString() {
		return "EmailDTO [senderName=" + senderName + ", senderMail=" + senderMail + ", receiveMail=" + receiveMail
				+ ", subject=" + subject + ", message=" + message + "]";
	}
	
	
}
