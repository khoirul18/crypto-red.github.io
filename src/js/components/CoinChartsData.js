import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Fade from "@material-ui/core/Fade";

import price_formatter from "../utils/price-formatter";

import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const styles = theme => ({
    coinImage: {
        borderRadius: 0
    },
    tableCellBold: {
        fontWeight: "bold"
    },
    price: {
        fontWeight: "bold"
    },
    green: {
        color: green[700],
    },
    red: {
        color: red[700],
    },
    title: {
        fontSize: 28,
        color: theme.palette.primary.dark
    },
    fullHeight: {
        height: "100%"
    }
});


class CoinChartsData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            selected_locales_code: props.selected_locales_code,
            selected_currency: props.selected_currency,
            coin_data: props.coin_data,
        };
    };
    componentWillReceiveProps(new_props) {

        this.setState(new_props);
    }

    _price_formatter = (price, compact = false, display_currency = true) => {

        const { selected_locales_code, selected_currency } = this.state;

        return display_currency ?
            price_formatter(price, selected_currency, selected_locales_code, compact):
            price_formatter(price, null, selected_locales_code, compact);
    };

    render() {

        const { classes, selected_currency, coin_data } = this.state;

        const data = Boolean(coin_data) ?
            <Fade in>
                <Card className={classes.fullHeight}>
                    <CardContent>
                        <CardHeader
                            classes={{title: classes.title}}
                            avatar={<Avatar className={classes.coinImage} src={coin_data.image.large}/>}
                            title={coin_data.name}
                        />
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <span>24h: </span>
                                        <span className={coin_data.market_data.price_change_percentage_24h <= 0 ? classes.red: classes.green}>
                                            {coin_data.market_data.price_change_percentage_24h.toFixed(2)}%
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span>7d: </span>
                                        <span className={coin_data.market_data.price_change_percentage_7d <= 0 ? classes.red: classes.green}>
                                            {coin_data.market_data.price_change_percentage_7d.toFixed(2)}%
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span>30d: </span>
                                        <span className={coin_data.market_data.price_change_percentage_30d <= 0 ? classes.red: classes.green}>
                                            {coin_data.market_data.price_change_percentage_30d.toFixed(2)}%
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span>1y: </span>
                                        <span className={coin_data.market_data.price_change_percentage_1y <= 0 ? classes.red: classes.green}>
                                            {coin_data.market_data.price_change_percentage_1y.toFixed(2)}%
                                        </span>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Table aria-label="main-info-table">
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left" className={classes.tableCellBold}>Price</TableCell>
                                    <TableCell align="right" className={classes.price}>{this._price_formatter(coin_data.market_data.current_price[selected_currency.toLowerCase()])}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className={classes.tableCellBold}>Market Cap</TableCell>
                                    <TableCell align="right">{this._price_formatter(coin_data.market_data.market_cap[selected_currency.toLowerCase()])}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className={classes.tableCellBold}>Total supply</TableCell>
                                    <TableCell align="right">{coin_data.market_data.total_supply}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className={classes.tableCellBold}>Market Cap Rank</TableCell>
                                    <TableCell align="right">#{coin_data.market_data.market_cap_rank}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className={classes.tableCellBold}>Alexa Rank</TableCell>
                                    <TableCell align="right">#{coin_data.public_interest_stats.alexa_rank}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className={classes.tableCellBold}>Today score</TableCell>
                                    <TableCell align="right">{coin_data.sentiment_votes_up_percentage}%</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className={classes.tableCellBold}>All-Time High</TableCell>
                                    <TableCell align="right">{this._price_formatter(coin_data.market_data.ath[selected_currency.toLowerCase()])}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className={classes.tableCellBold}>All-Time Low</TableCell>
                                    <TableCell align="right">{this._price_formatter(coin_data.market_data.atl[selected_currency.toLowerCase()])}</TableCell>
                                </TableRow>
                                <TableRow><p align="left">Data provided by <a href="https://coingecko.com/" target="_blank">CoinGecko</a></p></TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </Fade>: null;

        return (
            <div className={classes.fullHeight}>{data}</div>
        );
    }
}

export default withStyles(styles)(CoinChartsData);