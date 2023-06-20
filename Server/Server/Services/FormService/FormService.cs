using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Models.Identity;
using Server.Services.UserService;
using System.Data;

namespace Server.Services.CreateFormService
{
    public class FormService : IFormService
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserService _userService;

        public FormService(ApplicationDbContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }
        public void CreateForm(string formTitle, string creator, List<string> questions) // Task<ActionResult<FormModel>>
        {
            var newForm = new FormModel();
            newForm.Creator = creator;
            newForm.FormTitle = formTitle;
            _context.Forms.Add(newForm);

            for (int i = 0; i < questions.Count; i++)
            {
                var newQuestion = new QuestionModel();
                newQuestion.FormId = newForm.Id;
                newQuestion.Question = questions[i];
                _context.Questions.Add(newQuestion);
            }

            _context.SaveChangesAsync();
        }

        public List<GetAllFormResponse> GetAllForms()
        {
            var forms = _context.Forms.ToList();

            List<GetAllFormResponse> result = new List<GetAllFormResponse>();

            for (int i = 0; i < forms.Count; i++)
            {
                var currentForm = new GetAllFormResponse();
                currentForm.FormId = forms[i].Id;
                currentForm.Creator = forms[i].Creator;
                currentForm.FormTitle = forms[i].FormTitle;
                result.Add(currentForm);
            }

            return result;
        }

        public GetFormResponse GetForm(Guid id)
        {
            var form = _context.Forms.FirstOrDefault(u => u.Id == id);

            var questions = _context.Questions.Where(f => f.FormId == id).ToList();

            var result = new GetFormResponse();

            result.FormTitle = form.FormTitle;
            result.Creator = form.Creator;
            result.Questions = questions;

            return result;
        }

        public UserFormModel FillForm(List<FillFormRequest> request, Guid UserId, Guid FormId)
        {
            var newUserForm = new UserFormModel();
            newUserForm.UserId = UserId;
            newUserForm.FormId = FormId;
            newUserForm.FormStatus = FormStatus.Filled;
            newUserForm.RejectedComment = "";

            _context.UserForms.Add(newUserForm);

            for (int i = 0; i < request.Count; i++)
            {
                var newAnswer = new AnswerModel();
                newAnswer.UserFormId = request[i].FormId;
                newAnswer.QuestionId = request[i].QuestionId;
                newAnswer.AnswerValue = request[i].AnswerValue;
                _context.Answers.Add(newAnswer);
            }

            _context.SaveChanges();

            return newUserForm;
        }

        public async Task<List<FormsForReviewerResponse>> GetAllUserFormsForReviewer()
        {
            var forms = _context.UserForms.Where(f => f.FormStatus == FormStatus.Filled).ToList();

            List<FormsForReviewerResponse> result = new List<FormsForReviewerResponse>();

            for (int i = 0; i < forms.Count; i++)
            {
                var currentFormForReviewer = new FormsForReviewerResponse();
                var currentUser = await _userService.GetUserById(forms[i].UserId);
                var currentForm = await _context.Forms.FirstOrDefaultAsync(u => u.Id == forms[i].FormId);

                currentFormForReviewer.UserFormId = forms[i].Id;
                currentFormForReviewer.User = currentUser.FirstName + " " + currentUser.SecondName;
                currentFormForReviewer.TitleForm = currentForm.FormTitle;
                currentFormForReviewer.FormStatus = (forms[i].FormStatus).ToString();
                result.Add(currentFormForReviewer);
            }

            return result;
        }

        public async Task<FormForReviewerResponse> GetUserForm(Guid id)
        {
            var result = new FormForReviewerResponse();

            var userForm = await _context.UserForms.FirstOrDefaultAsync(f => f.Id == id);
            var currentForm = await _context.Forms.FirstOrDefaultAsync(f => f.Id == userForm.FormId);
            var user = await _userService.GetUserById(userForm.UserId);

            var questions = _context.Questions.Where(q => q.FormId == currentForm.Id).ToList();


            result.User = user.FirstName + " " + user.SecondName;
            result.FormTitle = currentForm.FormTitle;
            result.Status = (userForm.FormStatus).ToString();

            List<QuestionAndAnswer> answersList = new List<QuestionAndAnswer>();

            for (int i = 0; i < questions.Count; i++)
            {
                var newAnswer = new QuestionAndAnswer();

                newAnswer.Question = questions[i].Question;
                var answer = await _context.Answers.FirstOrDefaultAsync(a => a.QuestionId == questions[i].Id);
                newAnswer.Answer = answer.AnswerValue;
                answersList.Add(newAnswer);
            }

            result.Answers = answersList;

            return result;
        }

        public void GetFormById(Guid formId, string status, string comment)
        {
            FormStatus statusForm = (FormStatus)Enum.Parse(typeof(FormStatus), status);

            var form = _context.UserForms.FirstOrDefault(f => f.Id == formId);

            if (form != null) 
            {
                form.FormStatus = statusForm;
                form.RejectedComment = comment;
            }

            _context.UserForms.Update(form);
            _context.SaveChanges();
        }
    }
}
