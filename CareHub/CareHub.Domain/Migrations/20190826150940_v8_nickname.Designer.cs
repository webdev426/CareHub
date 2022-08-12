﻿// <auto-generated />
using System;
using CareHub.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CareHub.Domain.Migrations
{
    [DbContext(typeof(DomainDbContext))]
    [Migration("20190826150940_v8_nickname")]
    partial class v8_nickname
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CareHub.Domain.Entities.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<int>("AccountType");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NickName");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.Concern", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DisplayName");

                    b.Property<string>("InternalName");

                    b.HasKey("Id");

                    b.ToTable("Concerns");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.ConcernValue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ConcernId");

                    b.Property<string>("Name");

                    b.Property<int>("Value");

                    b.HasKey("Id");

                    b.HasIndex("ConcernId");

                    b.ToTable("ConcernValues");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateLastUpdate");

                    b.Property<string>("Description");

                    b.Property<DateTime>("End");

                    b.Property<bool>("FullDay");

                    b.Property<DateTime>("Start");

                    b.Property<string>("Title");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.IntakeManagerForm", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CaredName");

                    b.Property<string>("CaredPostalCode");

                    b.Property<bool>("LiveTogether");

                    b.Property<string>("PostalCode");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("IntakeManagerForms");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.NotificationsSchedule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Period");

                    b.Property<DateTime>("StartDate");

                    b.HasKey("Id");

                    b.ToTable("NotificationsSchedules");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.PainProblem", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BodyPart");

                    b.Property<int?>("Concern");

                    b.Property<DateTime>("DateTracked");

                    b.Property<int>("Intensity");

                    b.Property<bool>("IsFront");

                    b.Property<int>("PainType");

                    b.Property<long>("TrackedHealthStateId");

                    b.HasKey("Id");

                    b.HasIndex("TrackedHealthStateId")
                        .IsUnique();

                    b.ToTable("PainProblems");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.Problem", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("Concern");

                    b.Property<DateTime>("DateTracked");

                    b.Property<int>("Intensity");

                    b.Property<int>("ProblemTypeId");

                    b.Property<int>("TrackedHealthStateId");

                    b.Property<long?>("TrackedHealthStateId1");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ProblemTypeId");

                    b.HasIndex("TrackedHealthStateId1");

                    b.HasIndex("UserId");

                    b.ToTable("Problems");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.ProblemType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DisplayName");

                    b.Property<string>("InternalName");

                    b.HasKey("Id");

                    b.ToTable("ProblemTypes");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.Question", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("Text");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.Suggestion", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Link");

                    b.Property<string>("Title");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.ToTable("Suggestions");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.TrackedConcern", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ConcernId");

                    b.Property<int>("ConcernValue");

                    b.Property<long>("TrackedHealthStateId");

                    b.HasKey("Id");

                    b.HasIndex("ConcernId");

                    b.HasIndex("TrackedHealthStateId");

                    b.ToTable("TrackedConcerns");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.TrackedHealthState", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("Content");

                    b.Property<DateTime>("DateCreated");

                    b.Property<int?>("Happiness");

                    b.Property<int?>("Period");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("TrackedHealthStates");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.UsersSuggestion", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateUpdated");

                    b.Property<int>("Status");

                    b.Property<long>("SuggestionId");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("SuggestionId");

                    b.HasIndex("UserId");

                    b.ToTable("UsersSuggestions");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.ConcernValue", b =>
                {
                    b.HasOne("CareHub.Domain.Entities.Concern", "Concern")
                        .WithMany("ConcernValues")
                        .HasForeignKey("ConcernId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CareHub.Domain.Entities.Event", b =>
                {
                    b.HasOne("CareHub.Domain.Entities.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.IntakeManagerForm", b =>
                {
                    b.HasOne("CareHub.Domain.Entities.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.PainProblem", b =>
                {
                    b.HasOne("CareHub.Domain.Entities.TrackedHealthState", "TrackedHealthState")
                        .WithOne("PainProblem")
                        .HasForeignKey("CareHub.Domain.Entities.PainProblem", "TrackedHealthStateId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CareHub.Domain.Entities.Problem", b =>
                {
                    b.HasOne("CareHub.Domain.Entities.ProblemType", "ProblemType")
                        .WithMany()
                        .HasForeignKey("ProblemTypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CareHub.Domain.Entities.TrackedHealthState", "TrackedHealthState")
                        .WithMany("Problems")
                        .HasForeignKey("TrackedHealthStateId1");

                    b.HasOne("CareHub.Domain.Entities.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.Question", b =>
                {
                    b.HasOne("CareHub.Domain.Entities.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.TrackedConcern", b =>
                {
                    b.HasOne("CareHub.Domain.Entities.Concern", "Concern")
                        .WithMany()
                        .HasForeignKey("ConcernId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CareHub.Domain.Entities.TrackedHealthState", "TrackedHealthState")
                        .WithMany("TrackedConcerns")
                        .HasForeignKey("TrackedHealthStateId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CareHub.Domain.Entities.TrackedHealthState", b =>
                {
                    b.HasOne("CareHub.Domain.Entities.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("CareHub.Domain.Entities.UsersSuggestion", b =>
                {
                    b.HasOne("CareHub.Domain.Entities.Suggestion", "Suggestion")
                        .WithMany("UsersSuggestions")
                        .HasForeignKey("SuggestionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CareHub.Domain.Entities.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("CareHub.Domain.Entities.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("CareHub.Domain.Entities.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CareHub.Domain.Entities.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("CareHub.Domain.Entities.ApplicationUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
