import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import "./fontawesome/css/all.min.css";
import "bootstrap/scss/bootstrap.scss";

import Home from "./neetjee_guru/pages/Home";
import HomeExam from "./neetjee_guru/pages/HomeExam";
import StudentOrganizationProfile from './neetjee_guru/pages/StudentOrganizationProfile';
import Login from "./neetjee_guru/pages/Login";
import StudentSuccessRegister from "./student_module/pages/Success";
import StudentFailureRegister from "./student_module/pages/Failure";
import Package from "./neetjee_guru/pages/Package";
import Category from "./neetjee_guru/pages/Category";
import Branches from "./neetjee_guru/pages/Branches";
import AddSection from "./neetjee_guru/pages/AddSection";
import Groups from "./neetjee_guru/pages/Groups";
import Teachers from "./neetjee_guru/pages/Teachers";
import Students from "./neetjee_guru/pages/Students";
import OrganizationSetup from "./neetjee_guru/pages/OrganizationSetup";
import OrganizationProfile from "./neetjee_guru/pages/OrganizationProfile";
import PromoteStudent from "./neetjee_guru/pages/PromoteStudent";
import CreateQuestionPaper from "./neetjee_guru/pages/CreateQuestionPaper";
import OwnQuestionPaper from "./neetjee_guru/pages/OwnQuestionPaper";
import OwnQuestionCustom from "./neetjee_guru/pages/OwnQuestionCustom";
import QuestionsPreview from "./neetjee_guru/pages/QuestionsPreview";
import OwnQuestionCustompresent from "./neetjee_guru/pages/OwnQuestionCustompresent";
import OwnQuestionOldpresent from "./neetjee_guru/pages/OwnQuestionOldpresent";
import OwnQuestionCollegeExam from "./neetjee_guru/pages/OwnQuestionCollegeExam";
import OwnQuestionCumulative from "./neetjee_guru/pages/OwnQuestionCumulative";
import OwnQuestionChapter from "./neetjee_guru/pages/OwnQuestionChapter";
import OwnQuestionSemiGrand from "./neetjee_guru/pages/OwnQuestionSemiGrand";
import OwnQuestionGrand from "./neetjee_guru/pages/OwnQuestionGrand";
import ManageQuestionPaper from "./neetjee_guru/pages/ManageQuestionPaper";
import QuestionPaperResult from "./neetjee_guru/pages/QuestionPaperResult";
import Settings from "./neetjee_guru/pages/Settings";
import AdaptiveQuestionPaper from "./neetjee_guru/pages/AdaptiveQuestionPaper";
import ErrorQuestion from "./neetjee_guru/pages/ErrorQuestion";
import OurQuestions from "./neetjee_guru/pages/OurQuestions";
import ManageOurQuestionPaper from "./neetjee_guru/pages/ManageOurQuestionPaper";
import QuestionPattern from "./neetjee_guru/pages/QuestionPattern";
import CreateQuestionPattern from "./neetjee_guru/pages/CreateQuestionPattern";
import CreateCustomQuestionPaper from "./neetjee_guru/pages/CreateCustomQuestionPaper";
import CreateCustomSummery from "./neetjee_guru/pages/CreateCustomSummery";
import PageNotFound from "./neetjee_guru/pages/PageNotFound";
import UserCreations from "./neetjee_guru/pages/UserCreations";
import NotifyStudents from "./neetjee_guru/pages/NotifyStudents";
import ResultAnalysisCollege from "./neetjee_guru/pages/ResultAnalysis";
import PracticeExamAnalysisCollege from "./neetjee_guru/pages/PracticeExamAnalysis";
import StrengthAnalysisCollege from "./neetjee_guru/pages/StrengthAnalysis";
import TimeAnalysisCollege from "./neetjee_guru/pages/TimeAnalysis";
import ComplexityAnalysisCollege from "./neetjee_guru/pages/ComplexityAnalysis";
import ErrorAnalysisCollege from "./neetjee_guru/pages/ErrorAnalysis";
import QuestionTypeAnalysisCollege from "./neetjee_guru/pages/QuestionTypeAnalysis";



//Student Module

import ForgotPassword from "./student_module/pages/ForgotPassword";
import StudentPageNotFound from "./student_module/pages/PageNotFound";
import StudentLogin from "./student_module/pages/StudentLogin";
import StudentRegister from "./student_module/pages/StudentRegister";
import StudentHome from "./student_module/pages/StudentHome";
import LearnPractice from "./student_module/pages/LearnPractice";
import Subjects from "./student_module/pages/Subjects";
import NewTopics from "./student_module/pages/NewTopics";
import Chapter from "./student_module/pages/Chapter";
import OverAllChapterStrength from "./student_module/pages/OverAllChapterStrength";
import PracticeAndExamHistory from "./student_module/pages/PracticeAndExamHistory";
import ExamHistory from "./student_module/pages/ExamHistory";
import StartErrorExam from "./student_module/pages/StartErrorExam";
import WatchingVideo from "./student_module/pages/WatchingVideo";
import RevisionMaterial from "./student_module/pages/RevisionMaterial";
import SingleVideo from "./student_module/pages/SingleVideo";
import SingleShortNote from "./student_module/pages/SingleShortNote";
import PracticeInstructions from "./student_module/pages/PracticeInstructions";
import CustomInstructions from "./student_module/pages/CustomInstructions";
import PracticeSubmitback from "./student_module/pages/PracticeSubmitback";
import CustomsubmitBack from "./student_module/pages/CustomsubmitBack";
import PracticeExam from "./student_module/pages/PracticeExam";
import StudentAssistentExam from "./student_module/pages/StudentAssistentExam";
import ViewQuestionAnswer from "./student_module/pages/ViewQuestionAnswer";
import PracticeViewQuestionAnswer from "./student_module/pages/PracticeViewQuestionAnswer";
import PracticeErrorExam from "./student_module/pages/PracticeErrorExam";
import CustomExamTest from "./student_module/pages/CustomExamTest";
import Exam from "./student_module/pages/Exam";
import ScheduleExam from "./student_module/pages/ScheduleExam";
import CustomExam from "./student_module/pages/CustomExam";
import PreviousPaper from "./student_module/pages/PreviousPaper";
import CustomPreviousPaper from "./student_module/pages/CustomPreviousPaper";
import AdaptiveExam from "./student_module/pages/AdaptiveExam";
import ErrorExam from "./student_module/pages/ErrorExam";
import GetReadyForExam from "./student_module/pages/GetReadyForExam";
import ChapterExam from "./student_module/pages/ChapterExam";
import CumulativeExam from "./student_module/pages/CumulativeExam";
import GetReadySemiGrandExam from "./student_module/pages/GetReadySemiGrandExam";
import GetReadyGrandExam from "./student_module/pages/GetReadyGrandExam";
import GetReadyExamHistory from "./student_module/pages/GetReadyExamHistory";
import GetReadyExamUpcomingHistory from "./student_module/pages/GetReadyExamUpcomingHistory";
import GetReadyShortNoteMaterialRevisions from "./student_module/pages/GetReadyShortNoteMaterialRevisions";
import GetReadySingleShortNoteMaterialRevisions from "./student_module/pages/GetReadySingleShortNoteMaterialRevisions";
import Bookmarks from "./student_module/pages/Bookmarks";
import BookmarkVideos from "./student_module/pages/BookmarkVideos";
import SingleBookmarkVideo from "./student_module/pages/SingleBookmarkVideo";
import BookmarkShortnotesMaterials from "./student_module/pages/BookmarkShortnotesMaterials";
import BookmarkSingleShortNoteMaterialRevisions from "./student_module/pages/BookmarkSingleShortNoteMaterialRevisions";
import BookmarkPracticeQuestions from "./student_module/pages/BookmarkPracticeQuestions";
import BookmarkExamQuestions from "./student_module/pages/BookmarkExamQuestions";
import Profile from "./student_module/pages/Profile";
import Notes from "./student_module/pages/Notes";
import NoteVideos from "./student_module/pages/NoteVideos";
import SingleNotesVideo from "./student_module/pages/SingleNotesVideo";
import NotesShortnotesMaterials from "./student_module/pages/NotesShortnotesMaterials";
import NotesSingleShortNoteMaterialRevisions from "./student_module/pages/NotesSingleShortNoteMaterialRevisions";
import NotesPracticeQuestions from "./student_module/pages/NotesPracticeQuestions";
import NotesExamQuestions from "./student_module/pages/NotesExamQuestions";
import NotesSingleMaterialRevisions from "./student_module/pages/NotesSingleMaterialRevisions";
import ResultAnalysis from "./student_module/pages/ResultAnalysis";
import PracticeExamAnalysis from "./student_module/pages/PracticeExamAnalysis";
import StrengthAnalysis from "./student_module/pages/StrengthAnalysis";
import TimeAnalysis from "./student_module/pages/TimeAnalysis";
import ComplexityAnalysis from "./student_module/pages/ComplexityAnalysis";
import ErrorAnalysis from "./student_module/pages/ErrorAnalysis";
import QuestionTypeAnalysis from "./student_module/pages/QuestionTypeAnalysis";
import Notification from './student_module/pages/Notification';
import AllNotifications from './student_module/pages/AllNotifications';
import StudentPackage from './student_module/pages/StudentPackage';
import RevisionMaterialGroups from './student_module/pages/RevisionMaterialGroups';
import CustomRevisionMaterials from './student_module/pages/CustomRevisionMaterials';
import CustomSingleRevisionMaterial from './student_module/pages/CustomSingleRevisionMaterial';
import StudentLoading from "./student_module/pages/StudentLoading";
import StudentFeedBack from './student_module/pages/StudentFeedBack';
import PracticeTestExamResult from './student_module/pages/PracticeTestExamResult';
import PracticeExamResult from './student_module/pages/PracticeExamResult';
import PreviousPaperAnalysis from './student_module/pages/PreviousPaperAnalysis';
import LinkageChapterAnalysis from './student_module/pages/LinkageChapterAnalysis';

import SinglePracticeExamResult from './student_module/pages/SinglePracticeExamResult';
import SinglePracticeTestExamResult from './student_module/pages/SinglePracticeTestExamResult';
import StudentWiseResult from "./student_module/pages/StudentWiseResult";

import SingleVideoWatching from './student_module/pages/SingleVideoWatching';
import SubscribeOrderSummary from './student_module/pages/SubscribeOrderSummary';
import MockTestSeries from "./student_module/pages/MockTestSeries";
import MockTestOrderSummary from './student_module/pages/MockTestOrderSummary';
import VideosRecentlyWatched from './student_module/pages/VideosRecentlyWatched';
import Videos from './student_module/pages/Videos';
import OrderSummary from './student_module/pages/OrderSummary';
import SeriesExamTest from "./student_module/pages/SeriesExamTest";
import AutoStudentLoading from "./student_module/pages/AutoStudentLoading";
import ActionBookmarks from "./student_module/pages/ActionBookmarks";
import ActionRevisionMaterialGroups from "./student_module/pages/ActionRevisionMaterialGroups";
import NotificationLearn from "./student_module/pages/NotificationLearn";
import NotificationPractise from "./student_module/pages/NotificationPractise";
import ActionReadyExam from "./student_module/pages/GetReadyForExam";
import ActionExam from "./student_module/pages/Exam";
import ActionResultAnalysis from "./student_module/pages/ResultAnalysis";
import ActionNotes from "./student_module/pages/Notes";
import ActionFeedback from "./student_module/pages/StudentFeedBack";
import ActionPackages from "./student_module/pages/StudentPackage";
import ActionProfile from "./student_module/pages/Profile";
import ActionPreviousPapers from "./student_module/pages/PreviousPaperAnalysis";
import ActionForum from "./student_module/pages/ActionForum";
import ActionVideosScreen from "./student_module/pages/Videos";
import ActionTestSeriesScreen from "./student_module/pages/MockTestSeries";
import NotificationMockTestSeries from "./student_module/pages/NotificationMockTestSeries";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: "wrapper",
    };
  }

  menuToggler = () => {

    const { toggled } = this.state;
    if (toggled === "wrapper") {
      this.setState({ toggled: "wrapper sidebar-enable" });
    } else {
      this.setState({ toggled: "wrapper" });
    }
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className={this.state.toggled}>
            <Switch>
              <Route exact path="/clogin" component={Login} />

              <Route
                exact
                path="/student/payment-success/:id/:mobile/:name/:token"
                render={(props) => (
                  <StudentSuccessRegister
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/payment-failure/:id/:planid/:mobile/:coupnid/:name/:token"
                render={(props) => (
                  <StudentFailureRegister
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/"
                render={(props) => (
                  <Home changeToggle={() => this.menuToggler()} {...props} />
                )}
              />
              <Route
                exact
                path="/home-exam"
                render={(props) => (
                  <HomeExam changeToggle={() => this.menuToggler()} {...props} />
                )}
              />
              <Route exact path='/home/student-profile' render={(props) => (<StudentOrganizationProfile changeToggle={() => this.menuToggler()} {...props} />)} />

              <Route
                exact
                path="/settings/package"
                render={(props) => (
                  <Package changeToggle={() => this.menuToggler()} {...props} />
                )}
              />
              <Route
                exact
                path="/settings/category"
                render={(props) => (
                  <Category
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/settings/branches"
                render={(props) => (
                  <Branches
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/settings/add-section"
                render={(props) => (
                  <AddSection
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/settings/groups"
                render={(props) => (
                  <Groups changeToggle={() => this.menuToggler()} {...props} />
                )}
              />
              <Route
                exact
                path="/settings/teachers"
                render={(props) => (
                  <Teachers
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/settings/students"
                render={(props) => (
                  <Students
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/settings/organization-setup"
                render={(props) => (
                  <OrganizationSetup
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/settings/organization-profile"
                render={(props) => (
                  <OrganizationProfile
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/settings/promote-students"
                render={(props) => (
                  <PromoteStudent
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/settings/user-creations"
                render={(props) => (
                  <UserCreations
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/settings/notify-students"
                render={(props) => (
                  <NotifyStudents
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/create-question-paper"
                render={(props) => (
                  <CreateQuestionPaper
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/create-question-paper/own-question-paper"
                render={(props) => (
                  <OwnQuestionPaper
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/questions/create-question-paper/own-question-paper/custom"
                render={(props) => (
                  <OwnQuestionCustom
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/create-question-paper/own-question-paper/questionsPreview"
                render={(props) => (
                  <QuestionsPreview
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/create-question-paper/own-question-paper/main-custom"
                render={(props) => (
                  <OwnQuestionCustompresent
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/create-question-paper/own-question-paper/old-exam"
                render={(props) => (
                  <OwnQuestionOldpresent
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/create-question-paper/own-question-paper/college-exam"
                render={(props) => (
                  <OwnQuestionCollegeExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/create-question-paper/own-question-paper/cumulative"
                render={(props) => (
                  <OwnQuestionCumulative
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/create-question-paper/own-question-paper/chapter"
                render={(props) => (
                  <OwnQuestionChapter
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/create-question-paper/own-question-paper/semi-grand"
                render={(props) => (
                  <OwnQuestionSemiGrand
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/create-question-paper/own-question-paper/grand"
                render={(props) => (
                  <OwnQuestionGrand
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/questions/manage-question-paper"
                render={(props) => (
                  <ManageQuestionPaper
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/manage-question-paper/question-paper-result"
                render={(props) => (
                  <QuestionPaperResult
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/settings"
                render={(props) => (
                  <Settings
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/create-question-paper/adaptive-question-paper"
                render={(props) => (
                  <AdaptiveQuestionPaper
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/create-question-paper/error-question"
                render={(props) => (
                  <ErrorQuestion
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/our-questions"
                render={(props) => (
                  <OurQuestions
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/our-questions/manage-our-question-paper"
                render={(props) => (
                  <ManageOurQuestionPaper
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/question-pattern"
                render={(props) => (
                  <QuestionPattern
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/question-pattern/create-question-pattern"
                render={(props) => (
                  <CreateQuestionPattern
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/create-question-paper/create-custom-question-paper"
                render={(props) => (
                  <CreateCustomQuestionPaper
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questions/create-question-paper/create-custom-question-paper/create-custom-summery"
                render={(props) => (
                  <CreateCustomSummery
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/result-analysis"
                render={(props) => (
                  <ResultAnalysisCollege
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/practice-exam-analysis"
                render={(props) => (
                  <PracticeExamAnalysisCollege
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/strength-analysis"
                render={(props) => (
                  <StrengthAnalysisCollege
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/time-analysis"
                render={(props) => (
                  <TimeAnalysisCollege
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/complexity-analysis"
                render={(props) => (
                  <ComplexityAnalysisCollege
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/error-analysis"
                render={(props) => (
                  <ErrorAnalysisCollege
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/questiontype-analysis"
                render={(props) => (
                  <QuestionTypeAnalysisCollege
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route exact path='/student/notifications/notification' render={(props) => (<Notification changeToggle={() => this.menuToggler()} {...props} />)} />
              <Route exact path='/student/notifications' render={(props) => (<AllNotifications changeToggle={() => this.menuToggler()} {...props} />)} />



              {/* Student Module */}

              <Route
                exact
                path="/student/ForgotPassword"
                render={(props) => (
                  <ForgotPassword
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/login"
                render={(props) => (
                  <StudentLogin
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/login"
                render={(props) => (
                  <StudentLogin
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student"
                render={(props) => (
                  <StudentLogin
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/register"
                render={(props) => (
                  <StudentRegister
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/home"
                render={(props) => (
                  <StudentHome
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/learn-practice"
                render={(props) => (
                  <LearnPractice
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/subjects"
                render={(props) => (
                  <Subjects
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/subject/topics"
                render={(props) => (
                  <NewTopics changeToggle={() => this.menuToggler()} {...props} />
                )}
              />
              <Route
                exact
                path="/student/subject/chapter"
                render={(props) => (
                  <Chapter changeToggle={() => this.menuToggler()} {...props} />
                )}
              />
              <Route
                exact
                path="/student/subject/chapter-status"
                render={(props) => (
                  <OverAllChapterStrength
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/subject/practice-exam-history"
                render={(props) => (
                  <PracticeAndExamHistory
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/subject/exam-history"
                render={(props) => (
                  <ExamHistory
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/subject/start-error-exam"
                render={(props) => (
                  <StartErrorExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/subject/start-watching"
                render={(props) => (
                  <WatchingVideo
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/subject/video-watching"
                render={(props) => (
                  <SingleVideo
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/subject/start-learning"
                render={(props) => (
                  <RevisionMaterial
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/subject/short-notes"
                render={(props) => (
                  <SingleShortNote
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/subject/practice-instructions"
                render={(props) => (
                  <PracticeInstructions
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/subject/custom-instructions"
                render={(props) => (
                  <CustomInstructions
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/subject/practice-submitback"
                render={(props) => (
                  <PracticeSubmitback
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/subject/custom-submitback"
                render={(props) => (
                  <CustomsubmitBack
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/subject/practice-test"
                render={(props) => (
                  <PracticeExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/student-assist-exam/:exam_session_id/:exam_type"
                render={(props) => (
                  <StudentAssistentExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/view-question-answer"
                render={(props) => (
                  <ViewQuestionAnswer
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/practice-view-question-answer"
                render={(props) => (
                  <PracticeViewQuestionAnswer
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/subject/practice-errortest"
                render={(props) => (
                  <PracticeErrorExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/subject/exam"
                render={(props) => (
                  <CustomExamTest
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />


<Route
                exact
                path="/student/subject/series_test"
                render={(props) => (
                  <SeriesExamTest
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />


              <Route
                exact
                path="/student/exams"
                render={(props) => (
                  <Exam changeToggle={() => this.menuToggler()} {...props} />
                )}
              />
              <Route
                exact
                path="/student/exams/schedule-exam"
                render={(props) => (
                  <ScheduleExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/exams/custom-exam"
                render={(props) => (
                  <CustomExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/exams/previous-paper-exam"
                render={(props) => (
                  <PreviousPaper
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/exams/custom-previous-paper-exam"
                render={(props) => (
                  <CustomPreviousPaper
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/exams/adaptive-exam"
                render={(props) => (
                  <AdaptiveExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/exams/error-exam"
                render={(props) => (
                  <ErrorExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/get-ready-for-exam"
                render={(props) => (
                  <GetReadyForExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/get-ready-for-exam/chapter-exam"
                render={(props) => (
                  <ChapterExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/get-ready-for-exam/cumulative-exam"
                render={(props) => (
                  <CumulativeExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/get-ready-for-exam/semigrand-exam"
                render={(props) => (
                  <GetReadySemiGrandExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/get-ready-for-exam/grand-exam"
                render={(props) => (
                  <GetReadyGrandExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/get-ready-for-exam/history"
                render={(props) => (
                  <GetReadyExamHistory
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/get-ready-for-exam/upcoming-history"
                render={(props) => (
                  <GetReadyExamUpcomingHistory
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/get-ready-for-exam/get-ready-shortnotes-and-materials"
                render={(props) => (
                  <GetReadyShortNoteMaterialRevisions
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/get-ready-for-exam/get-ready-shortnotes/single-shortnote"
                render={(props) => (
                  <GetReadySingleShortNoteMaterialRevisions
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/bookmark"
                render={(props) => (
                  <Bookmarks
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/bookmark/videos"
                render={(props) => (
                  <BookmarkVideos
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/bookmark/videos/watch-video"
                render={(props) => (
                  <SingleBookmarkVideo
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/bookmark/shortnotes-and-materials"
                render={(props) => (
                  <BookmarkShortnotesMaterials
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/bookmark/shortnotes-and-material/single-shortnote"
                render={(props) => (
                  <BookmarkSingleShortNoteMaterialRevisions
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/bookmark/practice-questions"
                render={(props) => (
                  <BookmarkPracticeQuestions
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/bookmark/exam-questions"
                render={(props) => (
                  <BookmarkExamQuestions
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/profile"
                render={(props) => (
                  <Profile changeToggle={() => this.menuToggler()} {...props} />
                )}
              />

              <Route
                exact
                path="/student/notes"
                render={(props) => (
                  <Notes changeToggle={() => this.menuToggler()} {...props} />
                )}
              />
              <Route
                exact
                path="/student/notes/videos"
                render={(props) => (
                  <NoteVideos
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/notes/videos/watch-video"
                render={(props) => (
                  <SingleNotesVideo
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/notes/shortnotes-and-materials"
                render={(props) => (
                  <NotesShortnotesMaterials
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/notes/shortnotes-and-material/single-shortnote"
                render={(props) => (
                  <NotesSingleShortNoteMaterialRevisions
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/notes/practice-questions"
                render={(props) => (
                  <NotesPracticeQuestions
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/notes/exam-questions"
                render={(props) => (
                  <NotesExamQuestions
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/notes/shortnotes-and-material/single-revisions-material"
                render={(props) => (
                  <NotesSingleMaterialRevisions
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/result-analysis"
                render={(props) => (
                  <ResultAnalysis
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/practice-exam-analysis"
                render={(props) => (
                  <PracticeExamAnalysis
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/strength-analysis"
                render={(props) => (
                  <StrengthAnalysis
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/time-analysis"
                render={(props) => (
                  <TimeAnalysis
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/complexity-analysis"
                render={(props) => (
                  <ComplexityAnalysis
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/error-analysis"
                render={(props) => (
                  <ErrorAnalysis
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/questiontype-analysis"
                render={(props) => (
                  <QuestionTypeAnalysis
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route exact path='/student/package' render={(props) => (<StudentPackage changeToggle={() => this.menuToggler()} {...props} />)} />
              <Route exact path='/student/revision-material-groups' render={(props) => (<RevisionMaterialGroups changeToggle={() => this.menuToggler()} {...props} />)} />
              <Route exact path='/student/revision-material-groups/custom-revision-materials' render={(props) => (<CustomRevisionMaterials changeToggle={() => this.menuToggler()} {...props} />)} />
              <Route exact path='/student/revision-material-groups/custom-single-revision-material' render={(props) => (<CustomSingleRevisionMaterial changeToggle={() => this.menuToggler()} {...props} />)} />
              <Route path="/student/loading" component={StudentLoading} />

              <Route exact path='/student/feedback' render={(props) => (<StudentFeedBack changeToggle={() => this.menuToggler()} {...props} />)} />
              <Route exact path='/student/previous-paper-analysis' render={(props) => (<PreviousPaperAnalysis changeToggle={() => this.menuToggler()} {...props} />)} />
              <Route exact path='/student/linkage-chapter-analysis' render={(props) => (<LinkageChapterAnalysis changeToggle={() => this.menuToggler()} {...props} />)} />
              <Route exact path='/student/subject/exam-result' render={(props) => (<PracticeTestExamResult changeToggle={() => this.menuToggler()} {...props} />)} />
              <Route exact path='/student/subject/practice-result' render={(props) => (<PracticeExamResult changeToggle={() => this.menuToggler()} {...props} />)} />

              <Route exact path='/student/subject/single-practice-result' render={(props) => (<SinglePracticeExamResult changeToggle={() => this.menuToggler()} {...props} />)} />
              <Route exact path='/student/subject/single-exam-result' render={(props) => (<SinglePracticeTestExamResult changeToggle={() => this.menuToggler()} {...props} />)} />
              <Route
                exact
                path="/student/studentwise-result/:mobile"
                render={(props) => (
                  <StudentWiseResult
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route exact path='/student/subject/start-video-watching' render={(props) => (<SingleVideoWatching changeToggle={() => this.menuToggler()} {...props} />)} />
              <Route exact path='/student/video-order-summary' render={(props) => (<OrderSummary changeToggle={() => this.menuToggler()} {...props} />)} />

              <Route exact path='/student/moock-test-order-summary' render={(props) => (<MockTestOrderSummary changeToggle={() => this.menuToggler()} {...props} />)} />
              <Route exact path='/student/subscribe-plans-order-summary' render={(props) => (<SubscribeOrderSummary changeToggle={() => this.menuToggler()} {...props} />)} />
              <Route
                exact
                path="/student/exams/test-series"
                render={(props) => (
                  <MockTestSeries
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route exact path='/student/videos/recently-watched' render={(props) => (<VideosRecentlyWatched changeToggle={() => this.menuToggler()} {...props} />)} />
              <Route exact path='/student/videos' render={(props) => (<Videos changeToggle={() => this.menuToggler()} {...props} />)} />
<Route path="/student/auto-loading/:username/:token/:type" component={AutoStudentLoading} />
              <Route
                exact
                path="/student/action/Bookmark"
                render={(props) => (
                  <ActionBookmarks
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/action/RevisionMaterial"
                render={(props) => (
                  <ActionRevisionMaterialGroups
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/action/ReadyExam"
                render={(props) => (
                  <ActionReadyExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/action/Exam"
                render={(props) => (
                  <ActionExam
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/action/ResultAnalysis"
                render={(props) => (
                  <ActionResultAnalysis
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/action/Notes"
                render={(props) => (
                  <ActionNotes
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/action/Feedback"
                render={(props) => (
                  <ActionFeedback
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/action/Packages"
                render={(props) => (
                  <ActionPackages
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/action/Profile"
                render={(props) => (
                  <ActionProfile
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/action/PreviousPapers"
                render={(props) => (
                  <ActionPreviousPapers
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/action/Forum"
                render={(props) => (
                  <ActionForum
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/action/VideosScreen"
                render={(props) => (
                  <ActionVideosScreen
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/action/TestSeriesScreen"
                render={(props) => (
                  <ActionTestSeriesScreen
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />
              <Route
                exact
                path="/student/LiveMockTest"
                render={(props) => (
                  <NotificationMockTestSeries
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/learn/:subjectid/:chapterid/:topicid"
                render={(props) => (
                  <NotificationLearn
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />

              <Route
                exact
                path="/student/practice/:subjectid/:chapterid/:topicid"
                render={(props) => (
                  <NotificationPractise
                    changeToggle={() => this.menuToggler()}
                    {...props}
                  />
                )}
              />              <Route path="/student/*" component={StudentPageNotFound} />

              <Route path="*" component={PageNotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
