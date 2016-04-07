;
(function ($) {

	$.fn.timeInput = function () {

		function stringToTimeSpan(val) {
			if (!val) return undefined;

			var AMtoPMthreshold = 8;

			var time = val.trim().match(/^(\d{1,2})(?::)*([0-5][0-9])?\s*((P|A)(?:M)?)?$/i);
			if (time === null) return null;

			var hours = Number(time[1]);
			var minutes = time[2] ? Number(time[2]) : 0;
			var ampm = time[4];

			//Return invalid if military time with AM/PM qualifier.
			if ((hours > 12 && ampm) ||
				hours > 23) return null;

			//consider threshold.
			if (!ampm && hours < 12 && hours > 0 && hours < AMtoPMthreshold)
				hours = hours + 12;

			//if PM and hours are between 1 and 11.
			if (hours < 12 && hours > 0 && ampm && ampm.toUpperCase() === 'P') hours = hours + 12;
			if (hours === 12 && ampm && ampm.toUpperCase() === 'A') hours = 0;

			var sHours = hours.toString();
			var sMinutes = minutes.toString();
			if (hours < 10) sHours = '0' + sHours;
			if (minutes < 10 && minutes !== '00') sMinutes = '0' + sMinutes;

			return sHours + ':' + sMinutes + ':00';
		}

		function timeSpanToString(val) {
			if (!val) return undefined;

			var time = val.trim().match(/^(\d{2})(?::)(\d{2})(?::)?(\d{2})?$/i);
			if (time === null) return null;

			var hours = Number(time[1]);
			var minutes = Number(time[2]);
			var ampm = 'am';

			if (hours >= 12) {
				ampm = 'pm';
				hours = hours === 12 ? 12 : hours - 12;
			}
			if (hours === 0)
				hours = 12;

			return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm.toUpperCase();
		}

		function evaluate($element) {
			var value = $element.val();

			var military = '';
			if (!value) {
				military = $element.attr('data-time');
			} else{
				military = stringToTimeSpan(value);
			}
			var result = timeSpanToString(military);
			$element.attr('data-time', military).val(result).change();
		}

		return this.each(function () {
			var $ele = $(this);

			$ele.on('blur', function (e) {
				evaluate($ele);
			})

			evaluate($ele);
		});

	};
})(jQuery);
