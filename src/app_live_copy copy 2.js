import React, { Component, lazy, Suspense } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";
import "./fontawesome/css/all.min.css";
import "bootstrap/scss/bootstrap.scss";
import PageNotFound from "./neetjee_guru/pages/PageNotFound";
import Login from "./neetjee_guru/pages/Login";

const Home = React.lazy(() => import("./neetjee_guru/pages/Home"));
const HomeExam = React.lazy(() => import("./neetjee_guru/pages/HomeExam"));
const StudentOrganizationProfile = React.lazy(() => import("./neetjee_guru/pages/StudentOrganizationProfile"));

const StudentSuccessRegister = React.lazy(() => import("./student_module/pages/Success"));
const StudentFailureRegister = React.lazy(() => import("./student_module/pages/Failure"));
const Package = React.lazy(() => import("./neetjee_guru/pages/Package"));
const Category = React.lazy(() => import("./neetjee_guru/pages/Category"));
const Branches = React.lazy(() => import("./neetjee_guru/pages/Branches"));
const AddSection = React.lazy(() => import("./neetjee_guru/pages/AddSection"));
const Groups = React.lazy(() => import("./neetjee_guru/pages/Groups"));
const Teachers = React.lazy(() => import("./neetjee_guru/pages/Teachers"));
const Students = React.lazy(() => import("./neetjee_guru/pages/Students"));
const OrganizationSetup = React.lazy(() => import("./neetjee_guru/pages/OrganizationSetup"));
const OrganizationProfile = React.lazy(() => import("./neetjee_guru/pages/OrganizationProfile"));
const PromoteStudent = React.lazy(() => import("./neetjee_guru/pages/PromoteStudent"));
const CreateQuestionPaper = React.lazy(() => import("./neetjee_guru/pages/CreateQuestionPaper"));
const OwnQuestionPaper = React.lazy(() => import("./neetjee_guru/pages/OwnQuestionPaper"));
const OwnQuestionCustom = React.lazy(() => import("./neetjee_guru/pages/OwnQuestionCustom"));
const QuestionsPreview = React.lazy(() => import("./neetjee_guru/pages/QuestionsPreview"));
const OwnQuestionCustompresent = React.lazy(() => import("./neetjee_guru/pages/OwnQuestionCustompresent"));
const OwnQuestionOldpresent = React.lazy(() => import("./neetjee_guru/pages/OwnQuestionOldpresent"));
const OwnQuestionCollegeExam = React.lazy(() => import("./neetjee_guru/pages/OwnQuestionCollegeExam"));
const OwnQuestionCumulative = React.lazy(() => import("./neetjee_guru/pages/OwnQuestionCumulative"));
const OwnQuestionChapter = React.lazy(() => import("./neetjee_guru/pages/OwnQuestionChapter"));
const OwnQuestionSemiGrand = React.lazy(() => import("./neetjee_guru/pages/OwnQuestionSemiGrand"));
const OwnQuestionGrand = React.lazy(() => import("./neetjee_guru/pages/OwnQuestionGrand"));
const ManageQuestionPaper = React.lazy(() => import("./neetjee_guru/pages/ManageQuestionPaper"));
const QuestionPaperResult = React.lazy(() => import("./neetjee_guru/pages/QuestionPaperResult"));
const Settings = React.lazy(() => import("./neetjee_guru/pages/Settings"));
const AdaptiveQuestionPaper = React.lazy(() => import("./neetjee_guru/pages/AdaptiveQuestionPaper"));
const ErrorQuestion = React.lazy(() => import("./neetjee_guru/pages/ErrorQuestion"));
const OurQuestions = React.lazy(() => import("./neetjee_guru/pages/OurQuestions"));
const ManageOurQuestionPaper = React.lazy(() => import("./neetjee_guru/pages/ManageOurQuestionPaper"));
const QuestionPattern = React.lazy(() => import("./neetjee_guru/pages/QuestionPattern"));
const CreateQuestionPattern = React.lazy(() => import("./neetjee_guru/pages/CreateQuestionPattern"));
const CreateCustomQuestionPaper = React.lazy(() => import("./neetjee_guru/pages/CreateCustomQuestionPaper"));
const CreateCustomSummery = React.lazy(() => import("./neetjee_guru/pages/CreateCustomSummery"));
const UserCreations = React.lazy(() => import("./neetjee_guru/pages/UserCreations"));
const NotifyStudents = React.lazy(() => import("./neetjee_guru/pages/NotifyStudents"));
const ResultAnalysisCollege = React.lazy(() => import("./neetjee_guru/pages/ResultAnalysis"));
const PracticeExamAnalysisCollege = React.lazy(() => import("./neetjee_guru/pages/PracticeExamAnalysis"));
const StrengthAnalysisCollege = React.lazy(() => import("./neetjee_guru/pages/StrengthAnalysis"));
const TimeAnalysisCollege = React.lazy(() => import("./neetjee_guru/pages/TimeAnalysis"));
const ComplexityAnalysisCollege = React.lazy(() => import("./neetjee_guru/pages/ComplexityAnalysis"));
const ErrorAnalysisCollege = React.lazy(() => import("./neetjee_guru/pages/ErrorAnalysis"));
const QuestionTypeAnalysisCollege = React.lazy(() => import("./neetjee_guru/pages/QuestionTypeAnalysis"));

//Student Module
const ForgotPassword = React.lazy(() => import("./student_module/pages/ForgotPassword"));
const StudentPageNotFound = React.lazy(() => import("./student_module/pages/PageNotFound"));
const StudentLogin = React.lazy(() => import("./student_module/pages/StudentLogin"));
const StudentRegister = React.lazy(() => import("./student_module/pages/StudentRegister"));
const StudentHome = React.lazy(() => import("./student_module/pages/StudentHome"));
const LearnPractice = React.lazy(() => import("./student_module/pages/LearnPractice"));
const Subjects = React.lazy(() => import("./student_module/pages/Subjects"));
const NewTopics = React.lazy(() => import("./student_module/pages/NewTopics"));
const Chapter = React.lazy(() => import("./student_module/pages/Chapter"));
const OverAllChapterStrength = React.lazy(() => import("./student_module/pages/OverAllChapterStrength"));
const PracticeAndExamHistory = React.lazy(() => import("./student_module/pages/PracticeAndExamHistory"));
const ExamHistory = React.lazy(() => import("./student_module/pages/ExamHistory"));
const StartErrorExam = React.lazy(() => import("./student_module/pages/StartErrorExam"));
const WatchingVideo = React.lazy(() => import("./student_module/pages/WatchingVideo"));
const RevisionMaterial = React.lazy(() => import("./student_module/pages/RevisionMaterial"));
const SingleVideo = React.lazy(() => import("./student_module/pages/SingleVideo"));
const SingleShortNote = React.lazy(() => import("./student_module/pages/SingleShortNote"));
const PracticeInstructions = React.lazy(() => import("./student_module/pages/PracticeInstructions"));
const CustomInstructions = React.lazy(() => import("./student_module/pages/CustomInstructions"));
const PracticeSubmitback = React.lazy(() => import("./student_module/pages/PracticeSubmitback"));
const CustomsubmitBack = React.lazy(() => import("./student_module/pages/CustomsubmitBack"));
const PracticeExam = React.lazy(() => import("./student_module/pages/PracticeExam"));
const StudentAssistentExam = React.lazy(() => import("./student_module/pages/StudentAssistentExam"));
const ViewQuestionAnswer = React.lazy(() => import("./student_module/pages/ViewQuestionAnswer"));
const PracticeViewQuestionAnswer = React.lazy(() => import("./student_module/pages/PracticeViewQuestionAnswer"));
const PracticeErrorExam = React.lazy(() => import("./student_module/pages/PracticeErrorExam"));
const CustomExamTest = React.lazy(() => import("./student_module/pages/CustomExamTest"));
const Exam = React.lazy(() => import("./student_module/pages/Exam"));
const ScheduleExam = React.lazy(() => import("./student_module/pages/ScheduleExam"));
const CustomExam = React.lazy(() => import("./student_module/pages/CustomExam"));
const PreviousPaper = React.lazy(() => import("./student_module/pages/PreviousPaper"));
const CustomPreviousPaper = React.lazy(() => import("./student_module/pages/CustomPreviousPaper"));
const AdaptiveExam = React.lazy(() => import("./student_module/pages/AdaptiveExam"));
const ErrorExam = React.lazy(() => import("./student_module/pages/ErrorExam"));
const GetReadyForExam = React.lazy(() => import("./student_module/pages/GetReadyForExam"));
const ChapterExam = React.lazy(() => import("./student_module/pages/ChapterExam"));
const CumulativeExam = React.lazy(() => import("./student_module/pages/CumulativeExam"));
const GetReadySemiGrandExam = React.lazy(() => import("./student_module/pages/GetReadySemiGrandExam"));
const GetReadyGrandExam = React.lazy(() => import("./student_module/pages/GetReadyGrandExam"));
const GetReadyExamHistory = React.lazy(() => import("./student_module/pages/GetReadyExamHistory"));
const GetReadyExamUpcomingHistory = React.lazy(() => import("./student_module/pages/GetReadyExamUpcomingHistory"));
const GetReadyShortNoteMaterialRevisions = React.lazy(() => import("./student_module/pages/GetReadyShortNoteMaterialRevisions"));
const GetReadySingleShortNoteMaterialRevisions = React.lazy(() => import("./student_module/pages/GetReadySingleShortNoteMaterialRevisions"));
const Bookmarks = React.lazy(() => import("./student_module/pages/Bookmarks"));
const BookmarkVideos = React.lazy(() => import("./student_module/pages/BookmarkVideos"));
const SingleBookmarkVideo = React.lazy(() => import("./student_module/pages/SingleBookmarkVideo"));
const BookmarkShortnotesMaterials = React.lazy(() => import("./student_module/pages/BookmarkShortnotesMaterials"));
const BookmarkSingleShortNoteMaterialRevisions = React.lazy(() => import("./student_module/pages/BookmarkSingleShortNoteMaterialRevisions"));
const BookmarkPracticeQuestions = React.lazy(() => import("./student_module/pages/BookmarkPracticeQuestions"));
const BookmarkExamQuestions = React.lazy(() => import("./student_module/pages/BookmarkExamQuestions"));
const Profile = React.lazy(() => import("./student_module/pages/Profile"));
const Notes = React.lazy(() => import("./student_module/pages/Notes"));
const NoteVideos = React.lazy(() => import("./student_module/pages/NoteVideos"));
const SingleNotesVideo = React.lazy(() => import("./student_module/pages/SingleNotesVideo"));
const NotesShortnotesMaterials = React.lazy(() => import("./student_module/pages/NotesShortnotesMaterials"));
const NotesSingleShortNoteMaterialRevisions = React.lazy(() => import("./student_module/pages/NotesSingleShortNoteMaterialRevisions"));
const NotesPracticeQuestions = React.lazy(() => import("./student_module/pages/NotesPracticeQuestions"));
const NotesExamQuestions = React.lazy(() => import("./student_module/pages/NotesExamQuestions"));
const NotesSingleMaterialRevisions = React.lazy(() => import("./student_module/pages/NotesSingleMaterialRevisions"));
const ResultAnalysis = React.lazy(() => import("./student_module/pages/ResultAnalysis"));
const PracticeExamAnalysis = React.lazy(() => import("./student_module/pages/PracticeExamAnalysis"));
const StrengthAnalysis = React.lazy(() => import("./student_module/pages/StrengthAnalysis"));
const TimeAnalysis = React.lazy(() => import("./student_module/pages/TimeAnalysis"));
const ComplexityAnalysis = React.lazy(() => import("./student_module/pages/ComplexityAnalysis"));
const ErrorAnalysis = React.lazy(() => import("./student_module/pages/ErrorAnalysis"));
const QuestionTypeAnalysis = React.lazy(() => import("./student_module/pages/QuestionTypeAnalysis"));
const Notification = React.lazy(() => import("./student_module/pages/Notification"));
const AllNotifications = React.lazy(() => import("./student_module/pages/AllNotifications"));
const StudentPackage = React.lazy(() => import("./student_module/pages/StudentPackage"));
const RevisionMaterialGroups = React.lazy(() => import("./student_module/pages/RevisionMaterialGroups"));
const CustomRevisionMaterials = React.lazy(() => import("./student_module/pages/CustomRevisionMaterials"));
const CustomSingleRevisionMaterial = React.lazy(() => import("./student_module/pages/CustomSingleRevisionMaterial"));
const StudentLoading = React.lazy(() => import("./student_module/pages/StudentLoading"));
const StudentFeedBack = React.lazy(() => import('./student_module/pages/StudentFeedBack'));
const PreviousPaperAnalysis = React.lazy(() => import('./student_module/pages/PreviousPaperAnalysis'));
const LinkageChapterAnalysis = React.lazy(() => import('./student_module/pages/LinkageChapterAnalysis'));
const PracticeTestExamResult = React.lazy(() => import('./student_module/pages/PracticeTestExamResult'));
const PracticeExamResult = React.lazy(() => import('./student_module/pages/PracticeExamResult'));


const SinglePracticeExamResult = React.lazy(() => import('./student_module/pages/SinglePracticeExamResult'));
const SinglePracticeTestExamResult = React.lazy(() => import('./student_module/pages/SinglePracticeTestExamResult'));
const StudentWiseResult = React.lazy(() => import('./student_module/pages/StudentWiseResult'));


const SingleVideoWatching = React.lazy(() => import('./student_module/pages/SingleVideoWatching'));
const SubscribeOrderSummary = React.lazy(() => import('./student_module/pages/SubscribeOrderSummary'));
const MockTestSeries = React.lazy(() => import("./student_module/pages/MockTestSeries"));
const MockTestOrderSummary = React.lazy(() => import('./student_module/pages/MockTestOrderSummary'));
const VideosRecentlyWatched = React.lazy(() => import('./student_module/pages/VideosRecentlyWatched'));
const Videos = React.lazy(() => import('./student_module/pages/Videos'));

const OrderSummary = React.lazy(() => import('./student_module/pages/OrderSummary'));
const SeriesExamTest = React.lazy(() => import('./student_module/pages/SeriesExamTest'));
const AutoStudentLoading = React.lazy(() => import('./student_module/pages/AutoStudentLoading'));


const ActionBookmarks = React.lazy(() => import("./student_module/pages/ActionBookmarks"));
const ActionRevisionMaterialGroups = React.lazy(() => import("./student_module/pages/ActionRevisionMaterialGroups"));
const NotificationLearn = React.lazy(() => import("./student_module/pages/NotificationLearn"));
const NotificationPractise = React.lazy(() => import("./student_module/pages/NotificationPractise"));
const ActionReadyExam = React.lazy(() => import("./student_module/pages/GetReadyForExam"));
const ActionExam = React.lazy(() => import("./student_module/pages/Exam"));
const ActionResultAnalysis = React.lazy(() => import("./student_module/pages/ResultAnalysis"));
const ActionNotes = React.lazy(() => import("./student_module/pages/Notes"));
const ActionFeedback = React.lazy(() => import("./student_module/pages/StudentFeedBack"));
const ActionPackages = React.lazy(() => import("./student_module/pages/StudentPackage"));
const ActionProfile = React.lazy(() => import("./student_module/pages/Profile"));
const ActionPreviousPapers = React.lazy(() => import("./student_module/pages/PreviousPaperAnalysis"));
const ActionForum = React.lazy(() => import("./student_module/pages/ActionForum"));
const ActionVideosScreen = React.lazy(() => import("./student_module/pages/Videos"));
const ActionTestSeriesScreen = React.lazy(() => import("./student_module/pages/MockTestSeries"));
const ActionLearnPractice = React.lazy(() => import("./student_module/pages/LearnPractice"));
const NotificationMockTestSeries = React.lazy(() => import("./student_module/pages/NotificationMockTestSeries"));
const ActionStudentHome = React.lazy(() => import("./student_module/pages/StudentHome"));
const ActionLinkageAnalysis = React.lazy(() => import("./student_module/pages/LinkageChapterAnalysis"));
const ActionBlog = React.lazy(() => import("./student_module/pages/StudentBlog"));
const StudentBlog = React.lazy(() => import('./student_module/pages/StudentBlog'));
const StudentSingleBlog = React.lazy(() => import('./student_module/pages/StudentSingleBlog'));
const DefaultVideos = React.lazy(() => import('./student_module/pages/DefaultVideos'));

const YoutubeVideos = React.lazy(() => import('./student_module/pages/YoutubeVideos'));
const FeaturedVideos = React.lazy(() => import('./student_module/pages/FeaturedVideos'));
const CreatePreviousPaper = React.lazy(() => import('./student_module/pages/CreatePreviousPaper'));
const CollegeSinglePracticeTestExamResult = React.lazy(() => import('./student_module/pages/CollegeSinglePracticeTestExamResult'));

const DefaultPreviousPaperAnalysis = React.lazy(() => import('./student_module/pages/DefaultPreviousPaperAnalysis'));
const DefaultLinkageChapterAnalysis = React.lazy(() => import('./student_module/pages/DefaultLinkageChapterAnalysis'));
const DefaultRevisionMaterialGroups = React.lazy(() => import("./student_module/pages/DefaultRevisionMaterialGroups"));
const DefaultCustomRevisionMaterials = React.lazy(() => import("./student_module/pages/DefaultCustomRevisionMaterials"));
const DefaultCustomSingleRevisionMaterial = React.lazy(() => import("./student_module/pages/DefaultCustomSingleRevisionMaterial"));
const DefaultFeaturedVideos = React.lazy(() => import('./student_module/pages/DefaultFeaturedVideos'));
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
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <StudentSuccessRegister
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/payment-failure/:id/:planid/:mobile/:coupnid/:name/:token"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <StudentFailureRegister
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <Home {...props} />

                                </Suspense>)}
                        />
                        <Route
                            exact
                            path="/home-exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <HomeExam
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/home/student-profile"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <StudentOrganizationProfile
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/settings/package"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <Package {...props} />

                                </Suspense>)}
                        />
                        <Route
                            exact
                            path="/settings/category"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <Category
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/settings/branches"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <Branches
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/settings/add-section"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <AddSection
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/settings/groups"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <Groups {...props} />

                                </Suspense>)}
                        />
                        <Route
                            exact
                            path="/settings/teachers"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <Teachers
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/settings/students"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <Students
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/settings/organization-setup"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <OrganizationSetup
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/settings/organization-profile"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <OrganizationProfile
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/settings/promote-students"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <PromoteStudent
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/settings/user-creations"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <UserCreations
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/settings/notify-students"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <NotifyStudents
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/create-question-paper"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <CreateQuestionPaper
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/create-question-paper/own-question-paper"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <OwnQuestionPaper
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/questions/create-question-paper/own-question-paper/custom"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <OwnQuestionCustom
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/create-question-paper/own-question-paper/questionsPreview"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <QuestionsPreview
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/create-question-paper/own-question-paper/main-custom"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <OwnQuestionCustompresent
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/create-question-paper/own-question-paper/old-exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <OwnQuestionOldpresent
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/create-question-paper/own-question-paper/college-exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <OwnQuestionCollegeExam
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/create-question-paper/own-question-paper/cumulative"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <OwnQuestionCumulative
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/create-question-paper/own-question-paper/chapter"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <OwnQuestionChapter
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/create-question-paper/own-question-paper/semi-grand"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <OwnQuestionSemiGrand
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/create-question-paper/own-question-paper/grand"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <OwnQuestionGrand
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/questions/manage-question-paper"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ManageQuestionPaper
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/manage-question-paper/question-paper-result"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <QuestionPaperResult
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/settings"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <Settings
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/create-question-paper/adaptive-question-paper"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <AdaptiveQuestionPaper
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/create-question-paper/error-question"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ErrorQuestion
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/our-questions"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <OurQuestions
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/our-questions/manage-our-question-paper"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ManageOurQuestionPaper
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/question-pattern"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <QuestionPattern
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/question-pattern/create-question-pattern"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <CreateQuestionPattern
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/create-question-paper/create-custom-question-paper"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <CreateCustomQuestionPaper
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questions/create-question-paper/create-custom-question-paper/create-custom-summery"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <CreateCustomSummery
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/result-analysis"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ResultAnalysisCollege
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/practice-exam-analysis"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <PracticeExamAnalysisCollege
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/strength-analysis"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <StrengthAnalysisCollege
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/time-analysis"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <TimeAnalysisCollege
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/complexity-analysis"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ComplexityAnalysisCollege
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/error-analysis"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ErrorAnalysisCollege
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/questiontype-analysis"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <QuestionTypeAnalysisCollege
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/notifications/notification"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <Notification
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/notifications"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <AllNotifications
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />

                        {/* Student Module */}
                        <Route
                            exact
                            path="/student/ForgotPassword"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ForgotPassword
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/login"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <StudentLogin
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <StudentLogin
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/register"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <StudentRegister
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/home"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <StudentHome
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/learn-practice"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <LearnPractice
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/subjects"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <Subjects
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/subject/topics"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <NewTopics {...props} />

                                </Suspense>)}
                        />
                        <Route
                            exact
                            path="/student/subject/chapter"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <Chapter {...props} />

                                </Suspense>)}
                        />
                        <Route
                            exact
                            path="/student/subject/chapter-status"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <OverAllChapterStrength
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/subject/practice-exam-history"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <PracticeAndExamHistory
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/subject/exam-history"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ExamHistory
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/subject/start-error-exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <StartErrorExam
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/subject/start-watching"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <WatchingVideo
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/subject/video-watching"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <SingleVideo
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />


                        <Route
                            exact
                            path="/student/subject/start-learning"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <RevisionMaterial
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/subject/short-notes"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <SingleShortNote
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/subject/practice-instructions"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <PracticeInstructions
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/subject/custom-instructions"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <CustomInstructions
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/subject/practice-submitback"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <PracticeSubmitback
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/subject/custom-submitback"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <CustomsubmitBack
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/subject/practice-test"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <PracticeExam
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/student-assist-exam/:exam_session_id/:exam_type"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <StudentAssistentExam
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/view-question-answer"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ViewQuestionAnswer
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/practice-view-question-answer"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <PracticeViewQuestionAnswer
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/subject/practice-errortest"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <PracticeErrorExam
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/subject/exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <CustomExamTest
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/exams"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <Exam {...props} />

                                </Suspense>)}
                        />
                        <Route
                            exact
                            path="/student/exams/schedule-exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ScheduleExam
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/exams/custom-exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <CustomExam
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/exams/previous-paper-exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <PreviousPaper
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/exams/custom-previous-paper-exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <CustomPreviousPaper
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/exams/adaptive-exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <AdaptiveExam
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/exams/error-exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ErrorExam
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/get-ready-for-exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <GetReadyForExam
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/get-ready-for-exam/chapter-exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ChapterExam
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/get-ready-for-exam/cumulative-exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <CumulativeExam
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/get-ready-for-exam/semigrand-exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <GetReadySemiGrandExam
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/get-ready-for-exam/grand-exam"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <GetReadyGrandExam
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/get-ready-for-exam/history"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <GetReadyExamHistory
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/get-ready-for-exam/upcoming-history"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <GetReadyExamUpcomingHistory
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/get-ready-for-exam/get-ready-shortnotes-and-materials"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <GetReadyShortNoteMaterialRevisions
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/get-ready-for-exam/get-ready-shortnotes/single-shortnote"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <GetReadySingleShortNoteMaterialRevisions
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/bookmark"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <Bookmarks
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/bookmark/videos"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <BookmarkVideos
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/bookmark/videos/watch-video"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <SingleBookmarkVideo
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/bookmark/shortnotes-and-materials"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <BookmarkShortnotesMaterials
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/bookmark/shortnotes-and-material/single-shortnote"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <BookmarkSingleShortNoteMaterialRevisions
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/bookmark/practice-questions"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <BookmarkPracticeQuestions
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/bookmark/exam-questions"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <BookmarkExamQuestions
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/profile"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <Profile {...props} />

                                </Suspense>)}
                        />

                        <Route
                            exact
                            path="/student/notes"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <Notes {...props} />

                                </Suspense>)}
                        />
                        <Route
                            exact
                            path="/student/notes/videos"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <NoteVideos
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/notes/videos/watch-video"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <SingleNotesVideo
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/notes/shortnotes-and-materials"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <NotesShortnotesMaterials
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/notes/shortnotes-and-material/single-shortnote"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <NotesSingleShortNoteMaterialRevisions
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/notes/practice-questions"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <NotesPracticeQuestions
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/notes/exam-questions"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <NotesExamQuestions
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/notes/shortnotes-and-material/single-revisions-material"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <NotesSingleMaterialRevisions
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/result-analysis"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ResultAnalysis
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/practice-exam-analysis"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <PracticeExamAnalysis
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/strength-analysis"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <StrengthAnalysis
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/time-analysis"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <TimeAnalysis
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/complexity-analysis"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ComplexityAnalysis
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/error-analysis"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ErrorAnalysis
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/questiontype-analysis"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <QuestionTypeAnalysis
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/package"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <StudentPackage
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/revision-material-groups"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <RevisionMaterialGroups
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/revision-material-groups/custom-revision-materials"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <CustomRevisionMaterials
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/revision-material-groups/custom-single-revision-material"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <CustomSingleRevisionMaterial
                                        {...props}
                                    />
                                </Suspense>
                            )}
                        />
                        <Route exact path='/student/feedback' render={(props) => (
                            <Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }><StudentFeedBack {...props} /></Suspense>)} />
                        <Route exact path='/student/previous-paper-analysis' render={(props) => (<Suspense fallback={
                            <div className="d-flex align-items-center justify-content-center mt-50">
                                <div class="spinner-border text-primary text-center">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }><PreviousPaperAnalysis {...props} /></Suspense>)} />
                        <Route exact path='/student/linkage-chapter-analysis' render={(props) => (<Suspense fallback={
                            <div className="d-flex align-items-center justify-content-center mt-50">
                                <div class="spinner-border text-primary text-center">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }><LinkageChapterAnalysis {...props} /></Suspense>)} />
                        <Route exact path='/student/subject/exam-result' render={(props) => (<Suspense fallback={
                            <div className="d-flex align-items-center justify-content-center mt-50">
                                <div class="spinner-border text-primary text-center">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }><PracticeTestExamResult {...props} /></Suspense>)} />
                        <Route exact path='/student/subject/practice-result' render={(props) => (<Suspense fallback={
                            <div className="d-flex align-items-center justify-content-center mt-50">
                                <div class="spinner-border text-primary text-center">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }><PracticeExamResult {...props} /></Suspense>)} />

                        {/* <Route exact path='/student/custom-practise-exam' render={(props)=>(<Suspense fallback={<div class="spinner-border text-primary text-center">
          <span class="sr-only">Loading...</span>
        </div>}><CustomPractiseExam changeToggle={()=>this.menuToggler()} {...props} /></Suspense>)} />
             */}

                        <Route exact path='/student/subject/single-practice-result' render={(props) => (
                            <Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }><SinglePracticeExamResult {...props} /></Suspense>)} />
                        <Route exact path='/student/subject/single-exam-result' render={(props) => (<Suspense fallback={
                            <div className="d-flex align-items-center justify-content-center mt-50">
                                <div class="spinner-border text-primary text-center">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }><SinglePracticeTestExamResult {...props} /></Suspense>)} />
                        <Route exact path='/student/studentwise-result/:mobile' render={(props) => (<Suspense fallback={
                            <div className="d-flex align-items-center justify-content-center mt-50">
                                <div class="spinner-border text-primary text-center">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }><StudentWiseResult {...props} /></Suspense>)} /><Route exact path='/student/loading' render={(props) => (<Suspense fallback={
                            <div className="d-flex align-items-center justify-content-center mt-50">
                                <div class="spinner-border text-primary text-center">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }><StudentLoading {...props} /></Suspense>)} />

                        <Route exact path='/student/subject/start-video-watching' render={(props) => (<Suspense fallback={
                            <div className="d-flex align-items-center justify-content-center mt-50">
                                <div class="spinner-border text-primary text-center">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }><SingleVideoWatching {...props} /></Suspense>)} />
                        <Route exact path='/student/video-order-summary' render={(props) => (<Suspense fallback={
                            <div className="d-flex align-items-center justify-content-center mt-50">
                                <div class="spinner-border text-primary text-center">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }><OrderSummary {...props} /></Suspense>)} />

                        <Route exact path='/student/moock-test-order-summary' render={(props) => (<Suspense fallback={
                            <div className="d-flex align-items-center justify-content-center mt-50">
                                <div class="spinner-border text-primary text-center">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }><MockTestOrderSummary {...props} /></Suspense>)} />
                        <Route exact path='/student/subscribe-plans-order-summary' render={(props) => (<Suspense fallback={
                            <div className="d-flex align-items-center justify-content-center mt-50">
                                <div class="spinner-border text-primary text-center">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }><SubscribeOrderSummary {...props} /></Suspense>)} />
                        <Route
                            exact
                            path="/student/exams/test-series"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <MockTestSeries
                                    {...props}
                                /></Suspense>
                            )}
                        />
                        <Route exact path='/student/videos/recently-watched' render={(props) => (<Suspense fallback={
                            <div className="d-flex align-items-center justify-content-center mt-50">
                                <div class="spinner-border text-primary text-center">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }><VideosRecentlyWatched {...props} /></Suspense>)} />
                        <Route exact path='/student/videos' render={(props) => (<Suspense fallback={
                            <div className="d-flex align-items-center justify-content-center mt-50">
                                <div class="spinner-border text-primary text-center">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }><Videos {...props} /></Suspense>)} />
                        <Route
                            exact
                            path="/student/subject/series_test"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <SeriesExamTest
                                    {...props}
                                /></Suspense>
                            )}
                        />

                        <Route exact path="/student/auto-loading/:username/:token/:type" render={(props) => (<Suspense fallback={
                            <div className="d-flex align-items-center justify-content-center mt-50">
                                <div class="spinner-border text-primary text-center">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }><AutoStudentLoading {...props} /></Suspense>)} />
                        <Route
                            exact
                            path="/student/action/Bookmark"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <ActionBookmarks
                                    {...props}
                                />
                            </Suspense>)}
                        />
                        <Route
                            exact
                            path="/student/action/RevisionMaterial"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <ActionRevisionMaterialGroups
                                    {...props}
                                />
                            </Suspense>

                            )}
                        />

                        <Route
                            exact
                            path="/student/action/ReadyExam"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <ActionReadyExam
                                    {...props}
                                />
                            </Suspense>

                            )}
                        />

                        <Route
                            exact
                            path="/student/action/Exam"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <ActionExam
                                    {...props}
                                /></Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/action/ResultAnalysis"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <ActionResultAnalysis
                                    {...props}
                                /></Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/action/Notes"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <ActionNotes
                                    {...props}
                                /></Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/action/Feedback"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <ActionFeedback
                                    {...props}
                                /></Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/action/Packages"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <ActionPackages
                                    {...props}
                                /></Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/action/Profile"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <ActionProfile
                                    {...props}
                                /></Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/action/PreviousPapers"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <ActionPreviousPapers
                                    {...props}
                                /></Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/action/Forum"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <ActionForum
                                    {...props}
                                /></Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/action/VideosScreen"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <ActionVideosScreen
                                    {...props}
                                /></Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/action/TestSeriesScreen"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <ActionTestSeriesScreen
                                    {...props}
                                /></Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/LiveMockTest"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <NotificationMockTestSeries
                                    {...props}
                                /></Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/learn/:subjectid/:chapterid/:topicid"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <NotificationLearn
                                    {...props}
                                /></Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/practice/:subjectid/:chapterid/:topicid"
                            render={(props) => (<Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <NotificationPractise
                                    {...props}
                                /></Suspense>
                            )}
                        />

                        <Route exact path='/student/student-blog' render={(props) => (
                            <Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }><StudentBlog {...props} /></Suspense>)} />
                        <Route exact path='/student/student-blog/student-blog-view' render={(props) => (
                            <Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }><StudentSingleBlog {...props} /></Suspense>)} />
                        <Route exact path='/student/default-videos' render={(props) => (
                            <Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }><DefaultVideos {...props} /></Suspense>)} />

                        <Route
                            exact
                            path="/student/action/Learn"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ActionLearnPractice
                                        {...props}
                                    /></Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/action/home"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>

                                    <ActionStudentHome
                                        {...props}
                                    />
                                </Suspense>

                            )}
                        />

                        <Route
                            exact
                            path="/student/action/Linkage"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ActionLinkageAnalysis
                                        {...props}

                                    />
                                </Suspense>
                            )}
                        />
                        <Route
                            exact
                            path="/student/action/Blog"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <ActionBlog
                                        {...props}

                                    />
                                </Suspense>
                            )}
                        />
                        <Route exact path='/student/action/PlayVideo/:VIDEOID/:SOURCE/:TITLE' render={(props) => (
                            <Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <YoutubeVideos  {...props} />
                            </Suspense>)} />
                        <Route exact path='/student/featuredvideos' render={(props) => (
                            <Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <FeaturedVideos  {...props} />
                            </Suspense>)} />
                        <Route exact path='/student/createpreviouspaperexam' render={(props) => (
                            <Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <CreatePreviousPaper  {...props} />
                            </Suspense>)} />
                        <Route exact path='/student/action/Jee-mains2021' render={(props) => (
                            <Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <CreatePreviousPaper  {...props} />
                            </Suspense>)} />
                        <Route exact path='student/action/FeatureVideos' render={(props) => (
                            <Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <FeaturedVideos  {...props} />
                            </Suspense>)} />
                        <Route exact path='/student/default-previous-paper-analysis' render={(props) => (
                            <Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <DefaultPreviousPaperAnalysis  {...props} /></Suspense>)} />
                        <Route exact path='/student/default-linkage-chapter-analysis' render={(props) => (
                            <Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <DefaultLinkageChapterAnalysis  {...props} /></Suspense>)} />
                        <Route
                            exact
                            path="/student/default-revision-material-groups"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <DefaultRevisionMaterialGroups
                                        {...props}

                                    /></Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/revision-material-groups/default-custom-revision-materials"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <DefaultCustomRevisionMaterials
                                        {...props}

                                    /></Suspense>
                            )}
                        />

                        <Route
                            exact
                            path="/student/revision-material-groups/default-custom-single-revision-material"
                            render={(props) => (
                                <Suspense fallback={
                                    <div className="d-flex align-items-center justify-content-center mt-50">
                                        <div class="spinner-border text-primary text-center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                }>
                                    <DefaultCustomSingleRevisionMaterial
                                        {...props}

                                    /></Suspense>
                            )}
                        />
                        <Route exact path='/student/default-featured-videos' render={(props) => (
                            <Suspense fallback={
                                <div className="d-flex align-items-center justify-content-center mt-50">
                                    <div class="spinner-border text-primary text-center">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                </div>
                            }>
                                <DefaultFeaturedVideos {...props} />
                            </Suspense>)} />
                        <Route path='/student/*' render={(props) => (<Suspense fallback={
                            <div className="d-flex align-items-center justify-content-center mt-50">
                                <div class="spinner-border text-primary text-center">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }><StudentPageNotFound {...props} /></Suspense>)} />
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </div>

            </Router>
        );
    }
}

export default App;