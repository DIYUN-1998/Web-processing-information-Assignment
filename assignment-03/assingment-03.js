var finalColumn = 1;
var selected;
var highlighted = [];
var dataBackUp = null;
var data = [{
    name: "Zoe Hughes",
    id: 19252554,
    course: [
        {name: "Assignment 1", grade: 88},
        {name: "Assignment 2", grade: 72},
        {name: "Assignment 3", grade: 53},
        {name: "Assignment 4", grade: 74},
        {name: "Assignment 5", grade: 65}]
}, {
    name: "Aifric Murray",
    id: 19252586,
    course: [
        {name: "Assignment 1", grade: 91},
        {name: "Assignment 2", grade: 82},
        {name: "Assignment 3", grade: 78},
        {name: "Assignment 4", grade: 83},
        {name: "Assignment 5", grade: 90}]
}, {
    name: "Rayna Moran",
    id: 19252546,
    course: [
        {name: "Assignment 1", grade: 79},
        {name: "Assignment 2", grade: 69},
        {name: "Assignment 3", grade: -1},
        {name: "Assignment 4", grade: 77},
        {name: "Assignment 5", grade: 86}]
}, {
    name: "Seth Ryan",
    id: 19252597,
    course: [
        {name: "Assignment 1", grade: 68},
        {name: "Assignment 2", grade: 53},
        {name: "Assignment 3", grade: 35},
        {name: "Assignment 4", grade: 48},
        {name: "Assignment 5", grade: 97}]
}, {
    name: "Jenna Boyle",
    id: 19252563,
    course: [
        {name: "Assignment 1", grade: 64},
        {name: "Assignment 2", grade: 81},
        {name: "Assignment 3", grade: 91},
        {name: "Assignment 4", grade: 77},
        {name: "Assignment 5", grade: 70}]
}, {
    name: "Jannat Maher",
    id: 19252528,
    course: [
        {name: "Assignment 1", grade: 53},
        {name: "Assignment 2", grade: 88},
        {name: "Assignment 3", grade: 45},
        {name: "Assignment 4", grade: 61},
        {name: "Assignment 5", grade: -1}]
}, {
    name: "Abdul Shea",
    id: 19252536,
    course: [
        {name: "Assignment 1", grade: 45},
        {name: "Assignment 2", grade: 25},
        {name: "Assignment 3", grade: 20},
        {name: "Assignment 4", grade: 31},
        {name: "Assignment 5", grade: 23}]
}, {
    name: "Mihai Walsh",
    id: 19252507,
    course: [
        {name: "Assignment 1", grade: 98},
        {name: "Assignment 2", grade: 90},
        {name: "Assignment 3", grade: 93},
        {name: "Assignment 4", grade: 85},
        {name: "Assignment 5", grade: 90}]
}, {
    name: "Leah Ryan",
    id: 19252533,
    course: [
        {name: "Assignment 1", grade: 69},
        {name: "Assignment 2", grade: -1},
        {name: "Assignment 3", grade: 91},
        {name: "Assignment 4", grade: 73},
        {name: "Assignment 5", grade: 95}]
}, {
    name: "Eileen Scott",
    id: 19252561,
    course: [
        {name: "Assignment 1", grade: 64},
        {name: "Assignment 2", grade: 50},
        {name: "Assignment 3", grade: 59},
        {name: "Assignment 4", grade: 63},
        {name: "Assignment 5", grade: 74}]
}];

function loadTable() {
    var tableBody = $("#table tbody");
    //记录高亮
    //验证长度不为0
    var highlightedRows = $("#table tbody tr[class*='highlightRow']");
    if (highlightedRows.length !== 0) {
        highlightedRows.each(function () {
            highlighted.push($(this).children().eq(1).text());
        });
    }
    var highlightedColumns = $("#table thead th[class*='highlightColumn']");
    if (highlightedColumns.length !== 0) {
        highlightedColumns.each(function () {
            highlighted.push($(this).text());
        });
    }
    tableBody.html("");
    if (data.length !== 0) {
        //load head
        var courseCell = "";
        for (var i = 0; i < data[0].course.length; i++) {
            courseCell += "<th class='courseTh'>" + data[0].course[i].name + "</th>";
        }
        $("#table thead").html("<tr><th style='width: 13%'>Student Name</th><th style='width: 10%'>Student ID</th>" + courseCell + "<th style='width: 13%' onclick='toggleFinalGradeColumn()'></th></tr>");
        //load body
        var colorFlag = true;
        for (var i = 0; i < data.length; i++) {
            var courseCell = "";
            for (var j = 0; j < data[0].course.length; j++) {
                var grade = data[i].course[j].grade;
                if (grade !== -1) {
                    courseCell += "<td name='" + j + "' contenteditable='true' onkeydown='validateInput(event)' oninput='userInput(event)'>" + grade + "</td>";
                } else {
                    courseCell += "<td name='" + j + "' contenteditable='true' onkeydown='validateInput(event)' oninput='userInput(event)' onblur='loadTable()' onfocus='resetGradeCell(event)' class='un-submitted'>-</td>";
                }
            }
            if (colorFlag) {
                var colorClass = "darkRow";
            } else {
                var colorClass = "lightRow";
            }
            colorFlag = !colorFlag;
            tableBody.append("<tr name='" + i + "' class='" + colorClass + "'>" +
                "<td class='leftAlign'>" + data[i].name + "</td>" +
                "<td class='leftAlign'>" + data[i].id + "</td>" +
                courseCell + "<td></td></tr>");
        }
        updateFinalGradeColumn();
        bindHighlightFunction();
        activeRightClickMenu();
        //复原高亮
        console.log(highlighted)
        if (highlighted.length !== 0) {
            $("#table tbody tr").each(function () {
                if (highlighted.indexOf($(this).children().eq(1).text()) !== -1) {
                    $(this).children().eq(0).click();
                }
            });
            $("#table thead th").each(function () {
                if (highlighted.indexOf($(this).text()) !== -1) {
                    $(this).click();
                }
            });
            highlighted = [];
        }
        if (dataBackUp === null) {
            $("#panel button:last").attr("disabled", true);
        } else {
            $("#panel button:last").attr("disabled", false);
        }
        $("#panel p").text($(".un-submitted").length + " un-submitted");
    }
}

function activeRightClickMenu() {
    $("table tbody tr").off("contextmenu").contextmenu(function (e) {
        e.preventDefault();
        selected = $(this).attr("name");
        var menu = $("#menu");
        menu.css({"top": e.pageY + "px", "left": e.pageX + "px"});
        menu.show();
    });
    $("#menu").off("mouseleave").mouseleave(function () {
        $("#menu").hide();
    });

}

function bindHighlightFunction() {
    $("#table tbody tr td:nth-child(1)").off("click").click(function () {
        $(this).parent().toggleClass("highlightRow");
    });
    $(".courseTh").off("click").click(function () {
        var index = $(this).index();
        $("#table tr").each(function () {
            $(this).children().eq(index).toggleClass("highlightColumn");
        });
    });
}

function getFinalGrade(course) {
    var total = 0;
    for (var i = 0; i < course.length; i++) {
        if (course[i].grade !== -1) {
            total += course[i].grade;
        }
    }
    var avg = Math.round(total / course.length);
    if (finalColumn === 1) {
        return avg;
    } else if (finalColumn === 2) {
        if (avg >= 93) {
            return "A";
        } else if (avg >= 90) {
            return "A-";
        } else if (avg >= 87) {
            return "B+";
        } else if (avg >= 83) {
            return "B";
        } else if (avg >= 80) {
            return "B-";
        } else if (avg >= 77) {
            return "C+";
        } else if (avg >= 73) {
            return "C";
        } else if (avg >= 70) {
            return "C-";
        } else if (avg >= 67) {
            return "D+";
        } else if (avg >= 63) {
            return "D";
        } else if (avg >= 60) {
            return "D-";
        } else {
            return "F";
        }
    } else if (finalColumn === 3) {
        if (avg >= 93) {
            return "4.0";
        } else if (avg >= 90) {
            return "3.7";
        } else if (avg >= 87) {
            return "3.3";
        } else if (avg >= 83) {
            return "3.0";
        } else if (avg >= 80) {
            return "2.7";
        } else if (avg >= 77) {
            return "2.3";
        } else if (avg >= 73) {
            return "2.0";
        } else if (avg >= 70) {
            return "1.7";
        } else if (avg >= 67) {
            return "1.3";
        } else if (avg >= 63) {
            return "1.0";
        } else if (avg >= 60) {
            return "0.7";
        } else {
            return "0.0";
        }
    }
}

$(document).ready(function () {
    loadTable();
});

function userInput(e) {
    var o = $(e.target);
    if (/[^0-9]|^0+/.test(o.text())) {
        o.text(o.text().replace(/[^0-9]|^0+/g, ""));
        if (o.text() === "") {
            o.text("0");
        }
    }
    if (o.text() === "" || o.text() > 100) {
        data[o.parent().attr("name")].course[o.attr("name")].grade = -1;
        loadTable();
    } else {
        data[o.parent().attr("name")].course[o.attr("name")].grade = parseInt(o.text());
        updateFinalGradeColumn();
    }
}

function validateInput(e) {
    if (e.type === "keydown") {
        if (!(/\d/.test(e.key) || e.keyCode === 8 || e.keyCode === 37 || e.keyCode === 39 || (e.ctrlKey && e.keyCode === 65))) {
            e.returnValue = false;
        }
    } else if (e.type === "input") {
        var o = $(e.target);
        o.val(o.val().replace(/[^0-9]|/g, ""));
    } else if (e.type === "blur") {
        var o = $(e.target);
        if (o.val() === "") {
            o.addClass("nullTextTip");
        } else {
            o.removeClass("nullTextTip");
        }
    }
}

function activeEnter(e) {
    if (e.keyCode === 13) {
        $("#name").blur();
        $("#id").blur();
        addRow();
    }
}

function resetGradeCell(e) {
    var o = $(e.target);
    if (o.text() === "-") {
        o.removeClass("un-submitted");
        o.text("");
    }
}

function updateFinalGradeColumn() {
    if (finalColumn === 1) {
        $("#table thead th:last").text("Average (%)");
        for (var i = 0; i < data.length; i++) {
            var finalGradeCell = $("#table tr[name='" + i + "']").children().last();
            var finalGrade = getFinalGrade(data[i].course);
            finalGradeCell.text(finalGrade + "%");
            if (finalGrade < 60) {
                finalGradeCell.addClass("failed");
            } else {
                finalGradeCell.removeClass("failed");
            }
        }
    } else if (finalColumn === 2) {
        $("#table thead th:last").text("Average (Letter)");
        for (var i = 0; i < data.length; i++) {
            var finalGradeCell = $("#table tr[name='" + i + "']").children().last();
            var finalGrade = getFinalGrade(data[i].course);
            finalGradeCell.text(finalGrade);
            if (finalGrade === "F") {
                finalGradeCell.addClass("failed");
            } else {
                finalGradeCell.removeClass("failed");
            }
        }
    } else if (finalColumn === 3) {
        $("#table thead th:last").text("Average (4.0)");
        for (var i = 0; i < data.length; i++) {
            var finalGradeCell = $("#table tr[name='" + i + "']").children().last();
            var finalGrade = getFinalGrade(data[i].course);
            finalGradeCell.text(finalGrade);
            if (finalGrade === "0.0") {
                finalGradeCell.addClass("failed");
            } else {
                finalGradeCell.removeClass("failed");
            }
        }
    }
}

function toggleFinalGradeColumn() {
    finalColumn++;
    if (finalColumn > 3) {
        finalColumn = 1;
    }
    updateFinalGradeColumn();
}

function openInsertWindow(position) {
    if (position === "last") {
        selected = -1;
    } else if (position === "after") {
        selected++;
    }
    $("#cover").show();
    $("#insertWindow input").val("");
    $("#insertWindow").show();
}

function hideInsertWindow() {
    $("#insertWindow").hide();
    $("#cover").hide();
}

function addRow() {
    var name = $("#name");
    var id = $("#id");
    if (name.val() !== "" && id.val() !== "") {
        var newRow = {name: "", id: 0, course: []};
        newRow.name = name.val();
        newRow.id = id.val();
        newRow.course = JSON.parse(JSON.stringify(data[0].course));
        for (var i = 0; i < newRow.course.length; i++) {
            newRow.course[i].grade = -1;
        }
        dataBackUp = JSON.parse(JSON.stringify(data));
        if (selected === -1) {
            data.push(newRow);
        } else {
            data.splice(selected, 0, newRow);
        }
        loadTable();
        hideInsertWindow();
    } else {
        name.blur();
        id.blur();
    }
}

function deleteRow() {
    hideMenu();
    dataBackUp = JSON.parse(JSON.stringify(data));
    data.splice(selected, 1);
    loadTable();
}

function openCourseManager() {
    var list = $("#courseManager div:first");
    list.empty();
    for (var i = 0; i < data[0].course.length; i++) {
        list.append(" <div class='list' name='" + i + "'>" +
            "<input type='text' required='required' value='" + data[0].course[i].name + "' title=''>" +
            "<button type='button' class='deleteBtn' onclick=''>Delete</button>" +
            "<button type='button' class='downBtn' onclick=''>Down</button>" +
            "<button type='button' class='upBtn' onclick=''>Up</button></div>");
    }
    bindBtnFunction();
    $("#cover").show();
    $("#courseManager").show();
}

function hideCourseManager() {
    $("#courseManager").hide();
    $("#cover").hide();
}

function bindBtnFunction() {
    $(".upBtn").off("click").click(function () {
        var course = $(this).parent();
        if (course.index() !== 0) {
            course.prev().before(course);
            course.fadeOut().fadeIn();
        }
    });
    $(".downBtn").off("click").click(function () {
        var course = $(this).parent();
        var len = $(".downBtn").length;
        if (course.index() !== len - 1) {
            course.next().after(course);
            course.fadeOut().fadeIn();
        }
    });
    $(".deleteBtn").off("click").click(function () {
        $(this).parent().remove();
    });
}

function addCourse() {
    $("#courseManager div:first").append(" <div class='list' name='new'>" +
        "<input type='text' required='required' value='' title=''>" +
        "<button type='button' class='deleteBtn' onclick=''>Delete</button>" +
        "<button type='button' class='downBtn' onclick=''>Down</button>" +
        "<button type='button' class='upBtn' onclick=''>Up</button></div>");
    bindBtnFunction();
}

function saveCourse() {
    var courseElements = $("#courseManager .list");
    var notNull = true;
    for (var i = 0; i < courseElements.length; i++) {
        if ($(courseElements[i]).children("input").val() === "") {
            notNull = false;
        }
    }
    if (notNull) {
        dataBackUp = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < data.length; i++) {
            var newCourseArr = [];
            for (var j = 0; j < courseElements.length; j++) {
                var currentElement = $(courseElements[j]);
                if (currentElement.attr("name") !== "new") {
                    var course = data[i].course[currentElement.attr("name")];
                    course.name = currentElement.children("input").val();
                    newCourseArr.push(course);
                } else {
                    newCourseArr.push({name: currentElement.children("input").val(), grade: -1});
                }
            }
            data[i].course = newCourseArr;
        }
        hideCourseManager();
        loadTable();
    }
}

function undo() {
    data = JSON.parse(JSON.stringify(dataBackUp));
    dataBackUp = null;
    loadTable();
}

function hideMenu() {
    $("#menu").hide();
}