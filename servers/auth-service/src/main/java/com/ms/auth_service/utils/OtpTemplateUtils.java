package com.ms.auth_service.utils;

public class OtpTemplateUtils {
    public static String getEmailSubject(){
        return "Your MTBS One-Time Password (OTP)";
    }
    public static String getEmailBody(String otp){
        return String.format( """
                Hello,
                
                Your One-Time Password (OTP) for verifying your MTBS account is:
                
                %s
                
                This OTP is valid for 5 minutes.
                Please do not share this OTP with anyone for security reasons.
                
                If you did not request this OTP, please ignore this email.
                
                Thank you,
                MTBS Team
                """,otp);
    }
}
