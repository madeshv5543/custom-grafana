import { css, cx } from '@emotion/css';
import React from 'react';

import { GrafanaTheme2 } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { Icon, Link, useTheme2 } from '@grafana/ui';

export interface Props {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  target?: HTMLAnchorElement['target'];
  url: string;
}

export function MegaMenuItemText({ children, isActive, onClick, target, url }: Props) {
  const theme = useTheme2();
  const styles = getStyles(theme, isActive);
  const LinkComponent = !target && url.startsWith('/') ? Link : 'a';

  const linkContent = (
    <div className={styles.linkContent}>
      {children}

      {
        // As nav links are supposed to link to internal urls this option should be used with caution
        target === '_blank' && <Icon data-testid="external-link-icon" name="external-link-alt" />
      }
    </div>
  );

  return (
    <LinkComponent
      data-testid={selectors.components.NavMenu.item}
      className={cx(styles.container, {
        [styles.containerActive]: isActive,
      })}
      href={url}
      target={target}
      onClick={onClick}
    >
      {linkContent}
    </LinkComponent>
  );
}

MegaMenuItemText.displayName = 'MegaMenuItemText';

const getStyles = (theme: GrafanaTheme2, isActive: Props['isActive']) => ({
  container: css({
    alignItems: 'center',
    color: isActive ? theme.colors.jdsColors.menuActivetext : theme.colors.jdsColors.menuText,
    height: '100%',
    position: 'relative',
    width: '100%',

    '&:hover, &:focus-visible': {
      color: theme.colors.jdsColors.menuText,
      textDecoration: 'none',
    },

    '&:focus-visible': {
      boxShadow: 'none',
      outline: `2px solid ${theme.colors.primary.main}`,
      outlineOffset: '-2px',
      transition: 'none',
    },
  }),
  containerActive: css({
    backgroundColor: theme.colors.jdsColors.menu2,
    borderRadius: theme.spacing(1.5),
    position: 'relative',

    // '&::before': {
    //   backgroundColor: theme.colors.jdsColors.menu3,
    //   borderRadius: theme.shape.radius.default,
    //   content: '" "',
    //   display: 'block',
    //   height: '100%',
    //   position: 'absolute',
    //   transform: 'translateX(-50%)',
    //   width: theme.spacing(0.5),
    // },
  }),
  linkContent: css({
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    width: '100%',
    padding: theme.spacing(1.5, 2),
    justifyContent: 'space-between',
  }),
});
