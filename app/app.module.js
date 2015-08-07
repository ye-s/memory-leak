angular.module('app', ['eventCalendar']).controller('NoteCtrl', function($scope){
		$scope.note = {
			formatTags: function(){
				if (this.tags != null) {
					return this.tags.join(", ");
				}
			}
		};
		$scope.dataNote = {
			id: '',
			tags: [],
			link: '',
			info: '',
			timestamp: ''
		};
		$scope.notes = [];

		$scope.saveNote = function() {
			if ($scope.note.link == null){
				return;
			}
			var date = new Date();
			var tmpNote = $scope.note;			
			$scope.dataNote = tmpNote;
			if ($scope.note.tags != null){
				$scope.dataNote.tags = tmpNote.tags.replace(" ", "").split(/[ ,]+/);
			}
			$scope.dataNote.timestamp = date;
			$scope.notes.push($scope.dataNote);
			$scope.note = {};
			addFormatTags();
		};

		addFormatTags = function() {
			$scope.note.formatTags = function() {
				if (this.tags != null) {
					return this.tags.join(", ");
				}
			}
		};

	});

angular.module('app').filter('findEventByDate', function() {
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
});