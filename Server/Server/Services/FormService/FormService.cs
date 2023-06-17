using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using Server.Models.Identity;

namespace Server.Services.CreateFormService
{
    public class FormService : IFormService
    {
        private readonly ApplicationDbContext _context;

        public FormService(ApplicationDbContext context)
        {
            _context = context;
        }
        public void CreateForm(string formTitle, string creator, string[] questions) // Task<ActionResult<FormModel>>
        {
            var newForm = new FormModel();
            newForm.Creator = creator;
            newForm.FormTitle = formTitle;
            _context.Forms.Add(newForm);

            for (int i = 0; i < questions.Length; i++)
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
    }
}
