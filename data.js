(function () {
	// 初始化datepicker对象
	var datepicker = {};

	datepicker.getMonthData = function (year, month) {
		var ret = [];
		// 判断是否输入了月份和年份
		if (!year || !month) {
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}

		// 当月第一天
		var firstDay = new Date(year, month - 1, 1);

		var firstDayWeekDay = firstDay.getDay();
		if (firstDayWeekDay === 0) {
			firstDayWeekDay = 7;
		}

		// 防止月份越界，重新取year和month的值
		year = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;

		// 上月最后一天
		var lastDayOfLastMonth = new Date(year, month -1, 0);
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

		// 这个月日历需要显示上个月的日期
		var preMonthDayCount = firstDayWeekDay - 1;

		// 当月最后一天
		var lastDay = new Date(year, month, 0);
		var lastDate = lastDay.getDate();

		// 获取当月每一天的数据（一共六周）
		for (var i = 0;i < 7*6;i++) {
			var date = i + 1 - preMonthDayCount;
			var showDate = date;
			var thisMonth = month;
			// 上一月
			if (date <= 0){
				thisMonth = month - 1;
				showDate = lastDateOfLastMonth + date;
			} else if (date > lastDate) {
				//下一月
				thisMonth = month + 1;
				showDate = showDate - lastDate;
			}

			if (thisMonth === 0){
				thisMonth = 12;
			}
			if (thisMonth === 13) {
				thisMonth = 1;
			}

			ret.push({
				month: thisMonth,
				date: date,
				showDate: showDate
			});
		}

		return {
			days: ret,
			year: year,
			month: month
		};
	}

	window.datepicker = datepicker;
})();