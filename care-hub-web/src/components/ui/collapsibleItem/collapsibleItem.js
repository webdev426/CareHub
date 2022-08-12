import React, { useState, useEffect } from 'react';
import './styles.scss';

function CollapsibleItem({ children, ...props }) {
  const { title, collapse, setCollapse } = props;
  const [isCollapse, setIsCollapse] = useState(false);
  const [icon, setIcon] = useState('fas fa-minus');
  const [section, setSection] = useState('item-collapse');
  const [string, setString] = useState('');

  const toggle = () => {
    if (setCollapse) {
      setCollapse(!isCollapse);
    }
    updateCollapse(!isCollapse);
  };

  const updateCollapse = (status) => {
    setIcon(status ? 'fas fa-minus' : 'fas fa-plus');
    setSection(status ? 'item-collapse open' : 'item-collapse');

    setString(status ? '' : '');
    setIsCollapse(status);
  };

  useEffect(() => {
    updateCollapse(collapse);
  }, [collapse]);

  return (
    <div className={section}>
      <span className="toggle-action">
        {string}
        <i className={icon} />
      </span>
      <div className="section-head" onClick={toggle} role="button" tabIndex="0">
        <div className="section-head-title">{title}</div>
      </div>
      <div className="article-wrap">
        <div className="article">{children}</div>
      </div>
    </div>
  );
}

export default CollapsibleItem;
