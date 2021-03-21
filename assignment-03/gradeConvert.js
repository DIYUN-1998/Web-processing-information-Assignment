
        // convert from number (percentage) grade to Letter Grade scale
        function toLetterGrade (n) {
            let p = parseInt(n, 10); // in case it's a string
            let grades = {'A' : 93, 'A-' :  90, 'B+' :  87, 'B' :  83, 'B-' :  80, 'C+' :  77, 'C' :  73, 'C-' :  70, 'D+' :  67, 'D' :  63, 'D-' :  60};
            var grade = 'F';
            Object.keys(grades).some(function (k) { // iterate until truthy
                if (p >= grades[k]) {
                    grade = k;
                    return true;
                }
            });
            return grade;
        }

        // convert from number (percentage) grade to GPA 4.0 scale
        function toGPAGrade (n) {
            let p = parseInt(n, 10); // in case it's a string
            let grades = {'4.0' : 93, '3.7' :  90, '3.3' :  87, '3.0' :  83, '2.7' :  80, '2.3' :  77, '2.0' :  73, '1.7' :  70, '1.3' :  67, '1.0' :  63, '0.7' :  60};
            var grade = '0.0';
            Object.keys(grades).some(function (k) { // iterate until truthy
                if (p >= grades[k]) {
                    grade = k;
                    return true;
                }
            });
            return grade;
        }

        // convert from number (percentage) grade to Percentage scale
        function toPercentGrade (n) {
            return n+"%";
        }
