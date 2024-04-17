import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useIsAuth() {
    const navigate = useNavigate();
 
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/chatlist'); // 이미 로그인 상태일 경우 /chatlist로 리다이렉션
        }
      }, [navigate]);
    
}

