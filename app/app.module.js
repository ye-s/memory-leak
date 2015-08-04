angular.module('app', [
	]).controller('NoteCtrl', function($scope){
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
		};

	});