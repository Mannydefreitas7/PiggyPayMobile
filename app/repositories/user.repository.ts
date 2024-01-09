import {PostgrestError} from '@supabase/supabase-js';
import {Tables} from '../../@types/database.type';
import supabase from '../lib/supabase';

class UserRepository {
  async getUser(id: string): Promise<{
    user: Tables<'User'> | null;
    error: 'Not Registered' | PostgrestError | null;
  }> {
    const {data, error} = await supabase
      .from('User')
      .select('*')
      .eq('user_id', id);

    if (error) {
      return {
        error,
        user: null,
      };
    }

    if (data.length > 0) {
      return {
        error: null,
        user: data[0],
      };
    }

    return {
      error: 'Not Registered',
      user: null,
    };
  }

  async addUser(user: Tables<'User'>): Promise<{
    user: Tables<'User'> | null;
    error: PostgrestError | null;
  }> {
    const {data, error} = await supabase.from('User').insert([user]);
    if (error) {
      return {
        error,
        user: null,
      };
    }
    return {
      user: data,
      error: null,
    };
  }

  async checkIfAlreadyTaken(username: string): Promise<Boolean> {
    const {data, error} = await supabase
      .from('User')
      .select('username')
      .eq('username', username);

    if (error || data.length > 0) {
      return true;
    }
    return false;
  }
}

const userRespository = new UserRepository();
export default userRespository;
