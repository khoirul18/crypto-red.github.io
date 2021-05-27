import React from "react";
import { withStyles } from "@material-ui/core/styles"

import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    backdrop: {
        color: "#fff",
        zIndex: "1400"
    },
});


class AccountDialogOpen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            account: props.account,
            open: props.open,
            error: props.error,
            _account_password_input: "",
            _loading: false,
            _persistent: false,
        };
    };

    componentWillReceiveProps(new_props) {

        if(new_props.open === false) {

            this.setState({_loading: false});
        }
        this.setState(new_props);
    }

    _on_complete = (event) => {

        const { _account_password_input, account, _persistent } = this.state;

        this.setState({_account_password_input: "", _persistent: false, _loading: true});
        this.props.onComplete(event, account, _account_password_input, _persistent);
    };

    _handle_account_password_input_change = (event) => {

        const _account_password_input = event.target.value;
        this.setState({_account_password_input});
    };

    _handle_key_down_input = (event) => {

        if(event.keyCode === 13){

            this._on_complete(event);
        }
    };

    _handle_persistent_checkbox_change = (event) => {

        this.setState({_persistent: event.target.checked})
    };

    render() {

        const { classes, account, open, error, _account_password_input, _loading, _persistent } = this.state;

        return (
            <div>
                <Backdrop className={classes.backdrop} open={_loading && !error}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Dialog
                    open={open}
                    onClose={(event) => {this.props.cancel(event, account)}}
                    aria-labelledby="open-account-dialog-title"
                    aria-describedby="open-account-dialog-description"
                >
                    {Boolean(account) ?
                        <div>
                            <DialogTitle id="open-account-dialog-title">Open {account.name}?</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="open-account-dialog-description">
                                    Open <b>{account.name}</b> account, wallets, and notes temporarily.
                                    <br />
                                    Please Type in the password of the account to log in.
                                </DialogContentText>
                                <TextField
                                    onChange={this._handle_account_password_input_change}
                                    onKeyDown={this._handle_key_down_input}
                                    value={_account_password_input}
                                    error={error}
                                    helperText={error ? "Wrong password": ""}
                                    autoFocus
                                    id="password"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={_persistent} onChange={this._handle_persistent_checkbox_change} name="persistent" />}
                                    label="Stay logged"
                                />
                                <DialogContentText>
                                    {
                                        _persistent ?
                                            "WARNING: Your account's password will be stored unencrypted.":
                                            "GOOD: Your account's password won't be stored unencrypted."
                                    }
                                </DialogContentText>
                            </DialogContent>
                        </div>: null
                    }
                    <DialogActions>
                        <Button onClick={(event) => {this.props.cancel(event)}} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={(event) => {this._on_complete(event)}} variant="contained" color="primary">
                            Open
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(AccountDialogOpen);