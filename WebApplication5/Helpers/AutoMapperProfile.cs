using AutoMapper;
using WebApplication5.DTO;
using WebApplication5.Models;

namespace WebApplication5.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}