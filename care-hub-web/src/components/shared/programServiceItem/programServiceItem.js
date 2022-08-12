import React from 'react';
import './styles.scss';

import { ReactComponent as Mail } from '~/assets/svg/Mail.svg';
import { ReactComponent as Globe } from '~/assets/svg/Globe.svg';
import CollapsibleItem from '~/components/ui/collapsibleItem';

function ProgramServiceItem(props) {
  const { program, collapsed, setCollapsed } = props;
  const { Address = {} } = program || {};

  const validUrl = (url) => {
    if (!url.includes('http')) {
      return 'http://' + url;
    }
    return url;
  };

  const renderText = (text) => {
    return text && <p className="font-semibold">{text}</p>;
  };
  const renderContent = (text, content) => {
    return text && <p className="font-semibold">{content}</p>;
  };

  return (
    <div className="faq__item">
      <CollapsibleItem
        title={program.Title}
        collapse={collapsed}
        setCollapse={(flag) => setCollapsed(flag)}
      >
        <div className="faq__item-info">
          <div className="faq__info-blocks flex-block faq__program-item">
            <div className="faq__info-block">
              {renderText(Address.Address1)}
              <p className="font-semibold">
                {Address.city}
                {Address.city ? ', ' : ''}
                {Address.ProvinceCode}
              </p>
              {renderText(Address.PostalCode)}
              {renderText(program.Phone)}

              <div className="text-blue">
                {renderContent(
                  program.Email,
                  <a
                    className="flex align-items-center"
                    href={`mailto:${program.Email}`}
                    target="_blank"
                  >
                    <Mail />
                    <span>{program.Email}</span>
                  </a>
                )}
                {renderContent(
                  program.ProgramUrl,
                  <a
                    className="flex align-items-baseline"
                    href={validUrl(program.ProgramUrl)}
                    target="_blank"
                  >
                    <Globe />
                    <span>{program.ProgramUrl}</span>
                  </a>
                )}
              </div>
            </div>
            {program.Description && (
              <div className="faq__info-block">
                <div
                  dangerouslySetInnerHTML={{ __html: program.Description }}
                />
              </div>
            )}
          </div>
        </div>
      </CollapsibleItem>

      <hr />
    </div>
  );
}

export default ProgramServiceItem;
