import React, { PureComponent } from "react";
import moment from "moment";
import { DatePicker } from "antd";
import { defaultDateFormat } from "../../constants";
import "./style.scss";
class DateRangePicker extends PureComponent {
  constructor(props) {
    super(props);
    let now = moment(new Date());
    this.state = {
      startValue: now,
      endValue: now,
      endOpen: false
    };
  }

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (start, end) => {
    this.setState(
      prevState => ({
        startValue: start || prevState.startValue,
        endValue: end || prevState.endValue
      }),
      () => {
        const { startValue, endValue } = this.state;
        this.props.onChange({ start: startValue, end: endValue });
      }
    );
  };

  onStartChange = value => {
    const { endValue } = this.state;
    if (value > endValue) {
      this.onChange(value, value);
    } else {
      this.onChange(value, null);
    }
  };

  onEndChange = value => {
    this.onChange(null, value);
  };

  handleStartOpenChange = open => {
    const { startValue, endValue } = this.state;
    if (!open && startValue >= endValue) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = endOpen => {
    this.setState({ endOpen });
  };

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div>
        <DatePicker
          format={defaultDateFormat}
          value={startValue}
          placeholder="Baslangıç Tarihi"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        <DatePicker
          disabledDate={this.disabledEndDate}
          format={defaultDateFormat}
          value={endValue}
          placeholder="Bitiş Tarihi"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
      </div>
    );
  }
}

export default DateRangePicker;
