import {AuthOtpResponse, AuthResponse} from '@supabase/supabase-js';
import supabase from '../lib/supabase';
import {parsePhoneNumber} from 'libphonenumber-js';

async function sendCode(phone: string): Promise<AuthOtpResponse> {
  const formatted = parsePhoneNumber(phone, 'US');
  const res = await supabase.auth.signInWithOtp({
    phone: formatted.nationalNumber,
  });
  return res;
}

async function verifyOTP(otp: string, phone: string): Promise<AuthResponse> {
  const formatted = parsePhoneNumber(phone, 'US');
  const res = await supabase.auth.verifyOtp({
    phone: formatted.nationalNumber,
    token: otp,
    type: 'sms',
  });

  return res;
}

export {sendCode, verifyOTP};
