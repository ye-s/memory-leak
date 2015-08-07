angular.module("eventCalendar", []).controller("calendarDemo", function($scope) {
                $scope.day = moment();
				/*$scope.events = [];
				$scope.event = {
				};*/
                $scope.selected ="";
                $scope.events = [];
                $scope.scheduledEvent = {
					date: '',
					description: ''
				};
                $scope.addEvent = function() {
					var event = $scope.findDate($scope.events, scheduledEvent.date);
					if (event != null) {
						for (var i in events) {
						    if (events[i] == event) {
								events[i].description = scheduledEvent.description;
								break;
							}
						}
					} else {
						this.events.push(scheduledEvent);
					}
				};
				$scope.findDate = function(input, date) {
					var i = 0; 
					var len = input.length;
			        for (; i<len; i++) {
			            if (+input[i].date == +date) {
			                return input[i];
			            }
			        }
			        return null;
			   };
						
            });
/*angular.module('eventCalendar').filter('findEventByDate', function() {
    return function(input, date) {
		var i = 0; 
		var len = input.length;
        for (; i<len; i++) {
            if (+input[i].date == +date) {
                return input[i];
            }
        }
    return null;
  }
});  */
angular.module("eventCalendar").directive("calendar", function() {
                return {
                    restrict: "E",
                    templateUrl: "templates/calendar.html",
                    selected: "@",
/*                    scope: {
                        selected: "=",
						events: [],
						scheduledEvent: {
							date: '',
							description: ''
						},
						addEvent: function() {
							var event = $filter('findEventByDate')(this.events, scheduledEvent.date);
							if (event != null) {
								for (var i in events) {
								    if (events[i] == event) {
										events[i].description = scheduledEvent.description;
										break;
									}
								}
							} else {
								this.events.push(scheduledEvent);
							}
						}
                    },*/
                    controller: function($scope) {        
                        $scope.findDate = function(input, date) {
                          $scope.$parent.findDate(input, date);
                        };
                    },
                    link: function(scope) {
                        scope.selected = _removeTime(scope.selected || moment());
                        scope.month = scope.selected.clone();
                        var start = scope.selected.clone();
                        start.date(1);
                        _removeTime(start.day(0));
                        _buildMonth(scope, start, scope.month);
                        scope.select = function(day) {
                            scope.selected = day.date;
							_showEvents(day, scope);						
                        };
                        scope.next = function() {
                            var next = scope.month.clone();
                            _removeTime(next.month(next.month()+1).date(1));
                            scope.month.month(scope.month.month()+1);
                            _buildMonth(scope, next, scope.month);
                        };
                        scope.previous = function() {
                            var previous = scope.month.clone();
                            _removeTime(previous.month(previous.month()-1).date(1));
                            scope.month.month(scope.month.month()-1);
                            _buildMonth(scope, previous, scope.month);
                        };
                    }
                };
                /*scope.findDate = $scope.findDate;*/
				function _showEvents(day, scope){
					var searchDate = moment(day.date).format('YYYYMMDD');
					var event = scope.findDate(scope.events, searchDate);
					scheduledEvent.date = event.date;
					scheduledEvent.description = event.description;
				}
                function _removeTime(date) {
                    return date.day(0).hour(0).minute(0).second(0).millisecond(0);
                }
                function _buildMonth(scope, start, month) {
                    scope.weeks = [];
                    var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
                    while (!done) {
                        scope.weeks.push({ days: _buildWeek(date.clone(), month) });
                        date.add(1, "w");
                        done = count++ > 2 && monthIndex !== date.month();
                        monthIndex = date.month();
                    }
                }
                function _buildWeek(date, month) {
                    var days = [];
                    for (var i = 0; i < 7; i++) {
                        days.push({
                            name: date.format("dd").substring(0, 1),
                            number: date.date(),
                            isCurrentMonth: date.month() === month.month(),
                            isToday: date.isSame(new Date(), "day"),
                            date: date
                        });
                        date = date.clone();
                        date.add(1, "d");
                    }
                    return days;
                }
            });