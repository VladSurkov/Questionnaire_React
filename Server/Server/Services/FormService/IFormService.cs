using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Models.Identity;

namespace Server.Services.CreateFormService
{
    public interface IFormService
    {
        public void CreateForm(string titleForm, string creator, List<string> questions);

        public List<GetAllFormResponse> GetAllForms();

        public GetFormResponse GetForm(Guid id);

        public UserFormModel FillForm(List<FillFormRequest> request, Guid UserId, Guid FormId);

        public Task<List<FormsForReviewerResponse>> GetAllUserFormsForReviewer();

        public Task<FormForReviewerResponse> GetUserForm(Guid id);
    }
}
