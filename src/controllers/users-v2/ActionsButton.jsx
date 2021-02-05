import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BlockIcon from '@material-ui/icons/Block';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickView = () => {
    props.showView(props.userId, true)
    handleClose()
  }

  const handleClickBlock = () => {
    props.block(props.userId, !props.isBlock)
    handleClose()
  }

  const handleClickWallet = () => {
    props.showWallet(props.userId, true)
    handleClose()
  }

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Acciones
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClickView}>
          <StyledMenuItem>
            <ListItemIcon>
            <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Ver" />
          </StyledMenuItem>
        </MenuItem>
        <MenuItem onClick={handleClickBlock}>
          <StyledMenuItem>
            <ListItemIcon>
                <BlockIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={(props.isBlock)? "Desbloquear" : "Bloquear"} />
          </StyledMenuItem>
        </MenuItem>
        <MenuItem onClick={handleClickWallet}>
          <StyledMenuItem>
            <ListItemIcon>
                <MonetizationOnIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Cargar saldo" />
          </StyledMenuItem>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
