import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import "./fontawesome/css/all.min.css";
import "bootstrap/scss/bootstrap.scss";

import Home from "./neetjee_guru/pages/Home";
import HomeExam from "./neetjee_guru/pages/HomeExam";
import StudentOrganizationProfile from "./neetjee_guru/pages/StudentOrganizationProfile";
import Login from "./neetjee_guru/pages/Login";
import StudentSuccessRegister from "./student_module/pages/Success";
import PaymentSuccess from "./student_module/pages/PaymentSuccess";

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
import OwnQuestionMockExam from "./neetjee_guru/pages/OwnQuestionMockExam";
import OwnQuestionCollegeExam from "./neetjee_guru/pages/OwnQuestionCollegeExam";
import OwnQuestionELAPPExam from "./neetjee_guru/pages/OwnQuestionELAPPExam";
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
import CustomPracticeExam from "./student_module/pages/CustomPracticeExam";
import StudentAssistentExam from "./student_module/pages/StudentAssistentExam";
import ViewQuestionAnswer from "./student_module/pages/ViewQuestionAnswer";
import PracticeViewQuestionAnswer from "./student_module/pages/PracticeViewQuestionAnswer";
import PracticeErrorExam from "./student_module/pages/PracticeErrorExam";
import CustomExamTest from "./student_module/pages/CustomExamTest";
import SeriesExamTest from "./student_module/pages/SeriesExamTest";
import Exam from "./student_module/pages/Exam";
import ScheduleExam from "./student_module/pages/ScheduleExam";
import ExamsHistory from "./student_module/pages/ExamsHistory";
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
import Notification from "./student_module/pages/Notification";
import AllNotifications from "./student_module/pages/AllNotifications";
import StudentPackage from "./student_module/pages/StudentPackage";
import RevisionMaterialGroups from "./student_module/pages/RevisionMaterialGroups";

import CustomRevisionMaterials from "./student_module/pages/CustomRevisionMaterials";
import CustomSingleRevisionMaterial from "./student_module/pages/CustomSingleRevisionMaterial";
import StudentLoading from "./student_module/pages/StudentLoading";
import AutoStudentLoading from "./student_module/pages/AutoStudentLoading";
import StudentFeedBack from './student_module/pages/StudentFeedBack';
import PreviousPaperAnalysis from './student_module/pages/PreviousPaperAnalysis';
import LinkageChapterAnalysis from './student_module/pages/LinkageChapterAnalysis';
import PracticeTestExamResult from './student_module/pages/PracticeTestExamResult';


import PracticeExamResult from './student_module/pages/PracticeExamResult';
import CustomPracticeExamResult from './student_module/pages/CustomPracticeExamResult';

import OrderSummary from './student_module/pages/OrderSummary';
import CustomPractiseExam from './student_module/pages/CustomPractiseExam';



import SinglePracticeExamResult from './student_module/pages/SinglePracticeExamResult';
import SinglePracticeTestExamResult from './student_module/pages/SinglePracticeTestExamResult';
import StudentWiseResult from "./student_module/pages/StudentWiseResult";

import SingleVideoWatching from './student_module/pages/SingleVideoWatching';
import SubscribeOrderSummary from './student_module/pages/SubscribeOrderSummary';
import MockTestSeries from "./student_module/pages/MockTestSeries";
import MockTestOrderSummary from './student_module/pages/MockTestOrderSummary';
import VideosRecentlyWatched from './student_module/pages/VideosRecentlyWatched';
import Videos from './student_module/pages/Videos';

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
import ActionLearnPractice from "./student_module/pages/LearnPractice";
import NotificationMockTestSeries from "./student_module/pages/NotificationMockTestSeries";
import ActionStudentHome from "./student_module/pages/StudentHome";
import ActionLinkageAnalysis from "./student_module/pages/LinkageChapterAnalysis";
import ActionBlog from "./student_module/pages/StudentBlog";
import StudentBlog from './student_module/pages/StudentBlog';
import StudentSingleBlog from './student_module/pages/StudentSingleBlog';
import DefaultVideos from './student_module/pages/DefaultVideos';
import YoutubeVideos from './student_module/pages/YoutubeVideos';
import FeaturedVideos from './student_module/pages/FeaturedVideos';
import CreatePreviousPaper from './student_module/pages/CreatePreviousPaper';
import CollegeSinglePracticeTestExamResult from './student_module/pages/CollegeSinglePracticeTestExamResult';
import DefaultPreviousPaperAnalysis from './student_module/pages/DefaultPreviousPaperAnalysis';
import DefaultLinkageChapterAnalysis from './student_module/pages/DefaultLinkageChapterAnalysis';
import DefaultRevisionMaterialGroups from "./student_module/pages/DefaultRevisionMaterialGroups";
import DefaultCustomRevisionMaterials from "./student_module/pages/DefaultCustomRevisionMaterials";
import DefaultCustomSingleRevisionMaterial from "./student_module/pages/DefaultCustomSingleRevisionMaterial";
import DefaultFeaturedVideos from './student_module/pages/DefaultFeaturedVideos';
import ReactGA from 'react-ga';
// ReactGA.initialize('UA-168840247-1', { debug: true, alwaysSendToDefaultTracker: true });

//ReactGA.initialize([{ trackingId: 'UA-168840247-1', gaOptions: { name: 'ELAPP' } },], { debug: false, alwaysSendToDefaultTracker: false });
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          <Switch>
            <Route exact path="/login" component={Login} />

            <Route
              exact
              path="/student/payment-success/:id/:mobile/:name/:token"
              render={(props) => (
                <StudentSuccessRegister
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/ELAPP-payment-success/:id/:ptype/:type"
              render={(props) => (
                <PaymentSuccess
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/payment-failure/:id/:planid/:mobile/:coupnid/:name/:token"
              render={(props) => (
                <StudentFailureRegister
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/"
              render={(props) => (
                <Home  {...props} />
              )}
            />
            <Route
              exact
              path="/home-exam"
              render={(props) => (
                <HomeExam
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/home/student-profile"
              render={(props) => (
                <StudentOrganizationProfile
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/settings/package"
              render={(props) => (
                <Package {...props} />
              )}
            />
            <Route
              exact
              path="/settings/category"
              render={(props) => (
                <Category
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/settings/branches"
              render={(props) => (
                <Branches

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/settings/add-section"
              render={(props) => (
                <AddSection
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/settings/groups"
              render={(props) => (
                <Groups  {...props} />
              )}
            />
            <Route
              exact
              path="/settings/teachers"
              render={(props) => (
                <Teachers
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/settings/students"
              render={(props) => (
                <Students
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/settings/organization-setup"
              render={(props) => (
                <OrganizationSetup
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/settings/organization-profile"
              render={(props) => (
                <OrganizationProfile
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/settings/promote-students"
              render={(props) => (
                <PromoteStudent
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/settings/user-creations"
              render={(props) => (
                <UserCreations
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/settings/notify-students"
              render={(props) => (
                <NotifyStudents
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/create-question-paper"
              render={(props) => (
                <CreateQuestionPaper
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/create-question-paper/own-question-paper"
              render={(props) => (
                <OwnQuestionPaper
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/questions/create-question-paper/own-question-paper/custom"
              render={(props) => (
                <OwnQuestionCustom
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/create-question-paper/own-question-paper/questionsPreview"
              render={(props) => (
                <QuestionsPreview
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/create-question-paper/own-question-paper/main-custom"
              render={(props) => (
                <OwnQuestionCustompresent
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/create-question-paper/own-question-paper/old-exam"
              render={(props) => (
                <OwnQuestionOldpresent
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/questions/create-question-paper/own-question-paper/mock-exam"
              render={(props) => (
                <OwnQuestionMockExam
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/questions/create-question-paper/own-question-paper/college-exam"
              render={(props) => (
                <OwnQuestionCollegeExam
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/questions/create-question-paper/own-question-paper/ELAPP-exam"
              render={(props) => (
                <OwnQuestionELAPPExam
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/questions/create-question-paper/own-question-paper/cumulative"
              render={(props) => (
                <OwnQuestionCumulative
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/create-question-paper/own-question-paper/chapter"
              render={(props) => (
                <OwnQuestionChapter
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/create-question-paper/own-question-paper/semi-grand"
              render={(props) => (
                <OwnQuestionSemiGrand
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/create-question-paper/own-question-paper/grand"
              render={(props) => (
                <OwnQuestionGrand
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/questions/manage-question-paper"
              render={(props) => (
                <ManageQuestionPaper
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/manage-question-paper/question-paper-result"
              render={(props) => (
                <QuestionPaperResult
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/settings"
              render={(props) => (
                <Settings
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/create-question-paper/adaptive-question-paper"
              render={(props) => (
                <AdaptiveQuestionPaper
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/create-question-paper/error-question"
              render={(props) => (
                <ErrorQuestion
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/our-questions"
              render={(props) => (
                <OurQuestions
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/our-questions/manage-our-question-paper"
              render={(props) => (
                <ManageOurQuestionPaper
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/question-pattern"
              render={(props) => (
                <QuestionPattern
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/question-pattern/create-question-pattern"
              render={(props) => (
                <CreateQuestionPattern
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/create-question-paper/create-custom-question-paper"
              render={(props) => (
                <CreateCustomQuestionPaper
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questions/create-question-paper/create-custom-question-paper/create-custom-summery"
              render={(props) => (
                <CreateCustomSummery
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/result-analysis"
              render={(props) => (
                <ResultAnalysisCollege
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/practice-exam-analysis"
              render={(props) => (
                <PracticeExamAnalysisCollege

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/strength-analysis"
              render={(props) => (
                <StrengthAnalysisCollege

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/time-analysis"
              render={(props) => (
                <TimeAnalysisCollege
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/complexity-analysis"
              render={(props) => (
                <ComplexityAnalysisCollege
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/error-analysis"
              render={(props) => (
                <ErrorAnalysisCollege
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/questiontype-analysis"
              render={(props) => (
                <QuestionTypeAnalysisCollege

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/notifications/notification"
              render={(props) => (
                <Notification

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/notifications"
              render={(props) => (
                <AllNotifications
                  {...props}

                />
              )}
            />

            {/* Student Module */}
            <Route
              exact
              path="/student/ForgotPassword"
              render={(props) => (
                <ForgotPassword
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/login"
              render={(props) => (
                <StudentLogin
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/register"
              render={(props) => (
                <StudentRegister

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/"
              render={(props) => (
                <StudentLogin

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/home"
              render={(props) => (
                <StudentHome

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/learn-practice"
              render={(props) => (
                <LearnPractice

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/subjects"
              render={(props) => (
                <Subjects

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/subject/topics"
              render={(props) => (
                <NewTopics {...props} />
              )}
            />
            <Route
              exact
              path="/student/subject/chapter"
              render={(props) => (
                <Chapter {...props} />
              )}
            />
            <Route
              exact
              path="/student/subject/chapter-status"
              render={(props) => (
                <OverAllChapterStrength
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/subject/practice-exam-history"
              render={(props) => (
                <PracticeAndExamHistory
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/subject/exam-history"
              render={(props) => (
                <ExamHistory

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/subject/start-error-exam"
              render={(props) => (
                <StartErrorExam

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/subject/start-watching"
              render={(props) => (
                <WatchingVideo
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/subject/video-watching"
              render={(props) => (
                <SingleVideo

                  {...props}
                />
              )}
            />
            <Route exact path='/student/subject/start-video-watching' render={(props) => (<SingleVideoWatching  {...props} />)} />
            <Route exact path='/student/video-order-summary' render={(props) => (<OrderSummary  {...props} />)} />

            <Route exact path='/student/moock-test-order-summary' render={(props) => (<MockTestOrderSummary  {...props} />)} />
            <Route exact path='/student/subscribe-plans-order-summary' render={(props) => (<SubscribeOrderSummary  {...props} />)} />

            <Route
              exact
              path="/student/subject/start-learning"
              render={(props) => (
                <RevisionMaterial

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/subject/short-notes"
              render={(props) => (
                <SingleShortNote

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/subject/practice-instructions"
              render={(props) => (
                <PracticeInstructions
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/subject/custom-instructions"
              render={(props) => (
                <CustomInstructions

                  {...props}
                />
              )}
            />

            <Route
              exact
              path="/student/subject/practice-submitback"
              render={(props) => (
                <PracticeSubmitback
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/subject/custom-submitback"
              render={(props) => (
                <CustomsubmitBack

                  {...props}
                />
              )}
            />

            <Route
              exact
              path="/student/subject/practice-test"
              render={(props) => (
                <PracticeExam

                  {...props}
                />
              )}
            />

            <Route
              exact
              path="/student/subject/custompractice-test"
              render={(props) => (
                <CustomPracticeExam
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/student-assist-exam/:exam_session_id/:exam_type"
              render={(props) => (
                <StudentAssistentExam
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/view-question-answer"
              render={(props) => (
                <ViewQuestionAnswer
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/practice-view-question-answer"
              render={(props) => (
                <PracticeViewQuestionAnswer

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/subject/practice-errortest"
              render={(props) => (
                <PracticeErrorExam

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/subject/exam"
              render={(props) => (
                <CustomExamTest
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/subject/series_test"
              render={(props) => (
                <SeriesExamTest
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/exams"
              render={(props) => (
                <Exam  {...props} />
              )}
            />
            <Route
              exact
              path="/student/exams/schedule-exam"
              render={(props) => (
                <ScheduleExam
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/exams/total-exams-history"
              render={(props) => (
                <ExamsHistory
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/exams/test-series"
              render={(props) => (
                <MockTestSeries
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/exams/custom-exam"
              render={(props) => (
                <CustomExam
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/exams/previous-paper-exam"
              render={(props) => (
                <PreviousPaper
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/exams/custom-previous-paper-exam"
              render={(props) => (
                <CustomPreviousPaper
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/exams/adaptive-exam"
              render={(props) => (
                <AdaptiveExam

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/exams/error-exam"
              render={(props) => (
                <ErrorExam
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/get-ready-for-exam"
              render={(props) => (
                <GetReadyForExam
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/get-ready-for-exam/chapter-exam"
              render={(props) => (
                <ChapterExam
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/get-ready-for-exam/cumulative-exam"
              render={(props) => (
                <CumulativeExam
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/get-ready-for-exam/semigrand-exam"
              render={(props) => (
                <GetReadySemiGrandExam
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/get-ready-for-exam/grand-exam"
              render={(props) => (
                <GetReadyGrandExam
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/get-ready-for-exam/history"
              render={(props) => (
                <GetReadyExamHistory
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/get-ready-for-exam/upcoming-history"
              render={(props) => (
                <GetReadyExamUpcomingHistory

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/get-ready-for-exam/get-ready-shortnotes-and-materials"
              render={(props) => (
                <GetReadyShortNoteMaterialRevisions
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/get-ready-for-exam/get-ready-shortnotes/single-shortnote"
              render={(props) => (
                <GetReadySingleShortNoteMaterialRevisions
                  {...props}

                />
              )}
            />


            <Route
              exact
              path="/student/bookmark"
              render={(props) => (
                <Bookmarks
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/bookmark/videos"
              render={(props) => (
                <BookmarkVideos
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/bookmark/videos/watch-video"
              render={(props) => (
                <SingleBookmarkVideo
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/bookmark/shortnotes-and-materials"
              render={(props) => (
                <BookmarkShortnotesMaterials
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/bookmark/shortnotes-and-material/single-shortnote"
              render={(props) => (
                <BookmarkSingleShortNoteMaterialRevisions
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/bookmark/practice-questions"
              render={(props) => (
                <BookmarkPracticeQuestions
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/bookmark/exam-questions"
              render={(props) => (
                <BookmarkExamQuestions

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/profile"
              render={(props) => (
                <Profile {...props} />
              )}
            />

            <Route
              exact
              path="/student/notes"
              render={(props) => (
                <Notes  {...props} />
              )}
            />
            <Route
              exact
              path="/student/notes/videos"
              render={(props) => (
                <NoteVideos
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/notes/videos/watch-video"
              render={(props) => (
                <SingleNotesVideo

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/notes/shortnotes-and-materials"
              render={(props) => (
                <NotesShortnotesMaterials

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/notes/shortnotes-and-material/single-shortnote"
              render={(props) => (
                <NotesSingleShortNoteMaterialRevisions
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/notes/practice-questions"
              render={(props) => (
                <NotesPracticeQuestions
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/notes/exam-questions"
              render={(props) => (
                <NotesExamQuestions

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/notes/shortnotes-and-material/single-revisions-material"
              render={(props) => (
                <NotesSingleMaterialRevisions
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/result-analysis"
              render={(props) => (
                <ResultAnalysis
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/practice-exam-analysis"
              render={(props) => (
                <PracticeExamAnalysis

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/strength-analysis"
              render={(props) => (
                <StrengthAnalysis

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/time-analysis"
              render={(props) => (
                <TimeAnalysis
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/complexity-analysis"
              render={(props) => (
                <ComplexityAnalysis
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/error-analysis"
              render={(props) => (
                <ErrorAnalysis

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/questiontype-analysis"
              render={(props) => (
                <QuestionTypeAnalysis
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/package"
              render={(props) => (
                <StudentPackage
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/revision-material-groups"
              render={(props) => (
                <RevisionMaterialGroups
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/revision-material-groups/custom-revision-materials"
              render={(props) => (
                <CustomRevisionMaterials
                  {...props}

                />
              )}
            />
            <Route
              exact
              path="/student/revision-material-groups/custom-single-revision-material"
              render={(props) => (
                <CustomSingleRevisionMaterial
                  {...props}

                />
              )}
            />
            <Route exact path='/student/feedback' render={(props) => (<StudentFeedBack  {...props} />)} />
            <Route exact path='/student/previous-paper-analysis' render={(props) => (<PreviousPaperAnalysis  {...props} />)} />
            <Route exact path='/student/linkage-chapter-analysis' render={(props) => (<LinkageChapterAnalysis {...props} />)} />
            <Route exact path='/student/subject/exam-result' render={(props) => (<PracticeTestExamResult  {...props} />)} />



            <Route exact path='/student/subject/practice-result' render={(props) => (<PracticeExamResult {...props} />)} />



            <Route exact path='/student/subject/custompractice-result' render={(props) => (<CustomPracticeExamResult  {...props} />)} />
            <Route exact path='/student/custom-practise-exam' render={(props) => (<CustomPractiseExam  {...props} />)} />
            <Route exact path='/student/videos' render={(props) => (<Videos  {...props} />)} />


            <Route exact path='/student/videos/recently-watched' render={(props) => (<VideosRecentlyWatched  {...props} />)} />





            <Route exact path='/student/subject/single-practice-result' render={(props) => (<SinglePracticeExamResult  {...props} />)} />
            <Route exact path='/student/subject/single-exam-result' render={(props) => (<SinglePracticeTestExamResult  {...props} />)} />
            <Route exact path='/student/subject/college-single-exam-result/:sessionid/:mobile/:examtype' render={(props) => (<CollegeSinglePracticeTestExamResult  {...props} />)} />
            <Route
              exact
              path="/student/studentwise-result/:mobile"
              render={(props) => (
                <StudentWiseResult
                  {...props}


                />
              )}
            />

            <Route path="/student/loading" component={StudentLoading} />
            <Route path="/student/auto-loading/:username/:token/:type" component={AutoStudentLoading} />

            <Route
              exact
              path="/student/action/Bookmark"
              render={(props) => (
                <ActionBookmarks

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/action/RevisionMaterial"
              render={(props) => (
                <ActionRevisionMaterialGroups

                  {...props}
                />
              )}
            />

            <Route
              exact
              path="/student/action/ReadyExam"
              render={(props) => (
                <ActionReadyExam
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/action/Exam"
              render={(props) => (
                <ActionExam
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/action/ResultAnalysis"
              render={(props) => (
                <ActionResultAnalysis
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/action/Notes"
              render={(props) => (
                <ActionNotes
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/action/Feedback"
              render={(props) => (
                <ActionFeedback
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/action/Packages"
              render={(props) => (
                <ActionPackages
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/action/Profile"
              render={(props) => (
                <ActionProfile
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/action/PreviousPapers"
              render={(props) => (
                <ActionPreviousPapers
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/action/Forum"
              render={(props) => (
                <ActionForum
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/action/VideosScreen"
              render={(props) => (
                <ActionVideosScreen

                  {...props}
                />
              )}
            />

            <Route
              exact
              path="/student/action/TestSeriesScreen"
              render={(props) => (
                <ActionTestSeriesScreen

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/LiveMockTest"
              render={(props) => (
                <NotificationMockTestSeries
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/learn/:subjectid/:chapterid/:topicid"
              render={(props) => (
                <NotificationLearn
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/practice/:subjectid/:chapterid/:topicid"
              render={(props) => (
                <NotificationPractise
                  {...props}

                />
              )}
            />

            <Route exact path='/student/student-blog' render={(props) => (<StudentBlog  {...props} />)} />
            <Route exact path='/student/student-blog/student-blog-view' render={(props) => (<StudentSingleBlog {...props} />)} />
            <Route exact path='/student/default-videos' render={(props) => (<DefaultVideos {...props} />)} />
            <Route exact path='/student/default-featured-videos' render={(props) => (<DefaultFeaturedVideos {...props} />)} />

            <Route
              exact
              path="/student/action/Learn"
              render={(props) => (
                <ActionLearnPractice

                  {...props}
                />
              )}
            />

            <Route
              exact
              path="/student/action/Home"
              render={(props) => (
                <ActionStudentHome

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/action/Linkage"
              render={(props) => (
                <ActionLinkageAnalysis

                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/student/action/Blog"
              render={(props) => (
                <ActionBlog
                  {...props}

                />
              )}
            />
            {/* ttps://rizee.in/student/action/PlayVideo/:JSIbyTjwX10 */}

            <Route exact path='/student/action/PlayVideo/:VIDEOID/:SOURCE/:TITLE' render={(props) => (<YoutubeVideos  {...props} />)} />
            <Route exact path='/student/featuredvideos' render={(props) => (<FeaturedVideos  {...props} />)} />
            <Route exact path='/student/createpreviouspaperexam' render={(props) => (<CreatePreviousPaper  {...props} />)} />
            <Route exact path='/student/action/Jee-mains2021' render={(props) => (<CreatePreviousPaper  {...props} />)} />
            <Route exact path='/student/action/FeatureVideos' render={(props) => (<FeaturedVideos  {...props} />)} />

            <Route exact path='/student/default-previous-paper-analysis' render={(props) => (<DefaultPreviousPaperAnalysis  {...props} />)} />
            <Route exact path='/student/default-linkage-chapter-analysis' render={(props) => (<DefaultLinkageChapterAnalysis  {...props} />)} />
            <Route
              exact
              path="/student/default-revision-material-groups"
              render={(props) => (
                <DefaultRevisionMaterialGroups
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/revision-material-groups/default-custom-revision-materials"
              render={(props) => (
                <DefaultCustomRevisionMaterials
                  {...props}

                />
              )}
            />

            <Route
              exact
              path="/student/revision-material-groups/default-custom-single-revision-material"
              render={(props) => (
                <DefaultCustomSingleRevisionMaterial
                  {...props}

                />
              )}
            />

            <Route path="/student/*" component={StudentPageNotFound} />

            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>

      </Router>
    );
  }
}

export default App;
