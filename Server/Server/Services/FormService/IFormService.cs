﻿using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Models.Identity;

namespace Server.Services.CreateFormService
{
    public interface IFormService
    {
        public void CreateForm(string titleForm, string creator, string[] questions);

        public List<GetAllFormResponse> GetAllForms();

        public GetFormResponse GetForm(Guid id);
    }
}
