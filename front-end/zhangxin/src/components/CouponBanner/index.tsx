import React, { useState, useRef, useEffect } from 'react'
import { useIntl } from 'react-intl';
import './index.css'

interface TimeViewProps {
    h: string; 
    m: string; 
    s: string; 
  }
  
const CouponBanner: React.FC<{}> = () => {
    const countDownTimer = useRef<NodeJS.Timeout>(); 
    const { formatMessage } = useIntl();
    const [timeView, setTimeView] = useState<TimeViewProps | null>(null);
    const [screenWidth, setScreenWidth ] = useState<number>(window.screen.width)

    useEffect(() => {
        countDown();
        window.addEventListener('resize', resizeUpdate);
        return () => {
            clearTimeout(countDownTimer.current);
            window.removeEventListener('resize', resizeUpdate);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  const countDown = () => {
      const nowTime = + new Date(); 
      const endTIme = + new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000)
      const times = parseInt(`${(endTIme - nowTime) / 1000}`);
      const h = parseInt(`${(times / 60 / 60) % 24}`); 
      const m = parseInt(`${(times / 60) % 60}`); 
      const s = parseInt(`${times % 60}`); 
   
    setTimeView({
      h: h < 10 ? `0${h}` : `${h}`,
      m: m < 10 ? `0${m}` : `${m}`,
      s: s < 10 ? `0${s}` : `${s}`,
    });

    if (times <= 0) {
      clearTimeout(countDownTimer.current);
      setTimeView({ h: '00', m: '00', s: '00' });
    } else {
      countDownTimer.current = setTimeout(() => {
        countDown();
      }, 1000);
    }
 };
    
    const resizeUpdate = () => {
        setScreenWidth(window.screen.width)
    }

    return (
        <div className="couponBanner">
            <div className='logomv'>
                <div className='loagomv_font'>
                    <div>{formatMessage({ id: 'Enjoy' })}</div>
                    <div>30% off</div>
                </div>
            </div>
            <div className="coupon">
                <div className='coupon_font'>
                    <div className='coupon_font_left'>
                        <div>30%<br/>off</div>
                </div>
                    <div className='coupon_font_right'>
                        <div>{formatMessage({ id: 'welcome' })}</div>
                        <div>{screenWidth <= 768 ? formatMessage({ id: 'Allitems' }) :formatMessage({ id: 'Aplicable' })}</div>
                        <div>{screenWidth <= 768 ? formatMessage({ id: 'MinSpend' }): formatMessage({ id: 'MinOrder' })}</div>
                        <div className='coupon_font_right_button'>{screenWidth <= 768 ? formatMessage({ id: 'want' }): formatMessage({ id: 'quiero' })}</div>
                    </div>
                    <div className='coupon_font_tc'>T&C</div>
                </div>
            </div>
            {
                timeView && (
                    <div className='mask_group'>
                        {formatMessage({ id: 'Ends' })}
                        <span>{timeView.h}</span>{formatMessage({ id: 'h' })}
                        <span>{timeView.m}</span>{formatMessage({ id: 'm' })}
                        <span>{timeView.s}</span>{formatMessage({ id: 's' })}
                    </div>  
                )
            }
        </div>
    )
}

export default CouponBanner