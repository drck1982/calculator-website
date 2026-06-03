import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ADSENSE_CLIENT_ID } from '../../config/ads';

const CLARITY_PROJECT_ID = (import.meta.env.VITE_CLARITY_PROJECT_ID as string | undefined)?.trim();

export const MarketingScripts: React.FC = () => {
    const adsenseClient = ADSENSE_CLIENT_ID.trim();

    return (
        <Helmet>
            {adsenseClient && (
                <script
                    async
                    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
                    crossOrigin="anonymous"
                />
            )}

            {CLARITY_PROJECT_ID && (
                <script>
                    {`
                        (function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
                    `}
                </script>
            )}
        </Helmet>
    );
};
