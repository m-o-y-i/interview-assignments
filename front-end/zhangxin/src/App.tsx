/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import CouponBanner from './components/CouponBanner'
import { Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import './App.css';
import zh from './locales/zh';
import en from './locales/en';
function App() {
  const [locale, setLocal] = useState<any>('en')
  const [messages, setMessage] = useState<any>({ zh: zh, en: en, })
  const items: MenuProps['items'] = [
    {
      key: '1',
      disabled:locale === 'en',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={()=> setLocal('en')}>
          EN
        </a>
      ),
    },
    {
      key: '2',
      disabled:locale === 'zh',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={()=> setLocal('zh')}>
          中文
        </a>
      ),
    },
  ];
  return (
    <IntlProvider locale={locale} messages={messages[locale]} >
      <Dropdown menu={{ items }} className="dropdown" trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
            语言
            <DownOutlined className='dropdownIcon'/>
        </a>
      </Dropdown>
      <CouponBanner />
    </IntlProvider>
  );
}

export default App;
